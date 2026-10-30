import { assign, emit, fromPromise, setup } from 'xstate';
import type { CartItem, CheckoutResult } from '../types';

interface CheckoutContext {
  items: CartItem[];
  error: string | null;
  order: CheckoutResult | null;
}

type CheckoutEvent =
  | { type: 'SYNC_CART'; items: CartItem[] }
  | { type: 'SUBMIT' }
  | { type: 'CANCEL' };

interface PaymentInput {
  items: CartItem[];
  total: number;
}

function isOrderId(value: unknown): value is string | number {
  return (
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && Number.isFinite(value))
  );
}

function isCheckoutResult(value: unknown): value is CheckoutResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'items' in value &&
    Array.isArray(value.items) &&
    'total' in value &&
    typeof value.total === 'number' &&
    Number.isFinite(value.total)
  );
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to complete checkout';
}

const submitOrder = fromPromise<CheckoutResult, PaymentInput>(async ({ input, signal }) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: input.items, total: input.total }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Checkout request failed (${response.status})`);
  }

  const result: unknown = await response.json();
  if (
    typeof result !== 'object' ||
    result === null ||
    !('id' in result) ||
    !isOrderId(result.id)
  ) {
    throw new Error('Checkout response did not contain a valid order ID');
  }

  return { id: String(result.id), items: input.items, total: input.total };
});

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
    emitted: {} as { type: 'ORDER_COMPLETED'; order: CheckoutResult },
  },
  actors: {
    submitOrder,
  },
  guards: {
    cartIsNotEmpty: ({ context }) => context.items.length > 0,
    incomingCartIsNotEmpty: ({ event }) =>
      event.type === 'SYNC_CART' && event.items.length > 0,
  },
  actions: {
    syncCart: assign({
      items: ({ event }) => (event.type === 'SYNC_CART' ? event.items : []),
    }),
    clearError: assign({ error: () => null, order: () => null }),
    storeFailure: assign({
      error: ({ event }) =>
        'error' in event ? getErrorMessage(event.error) : 'Unable to complete checkout',
    }),
    storeOrder: assign({
      order: ({ event }) => ('output' in event && isCheckoutResult(event.output) ? event.output : null),
      error: () => null,
    }),
  },
}).createMachine({
  id: 'checkout',
  initial: 'reviewing',
  context: {
    items: [],
    error: null,
    order: null,
  },
  on: {
    SYNC_CART: { actions: 'syncCart' },
  },
  states: {
    reviewing: {
      on: {
        SUBMIT: {
          guard: 'cartIsNotEmpty',
          target: 'submitting',
          actions: 'clearError',
        },
      },
    },
    submitting: {
      invoke: {
        id: 'submit-order',
        src: 'submitOrder',
        input: ({ context }) => ({
          items: context.items.map((item) => ({ ...item })),
          total: context.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        onDone: {
          target: 'success',
          actions: [
            'storeOrder',
            emit(({ event }) => ({
              type: 'ORDER_COMPLETED',
              order: event.output,
            })),
          ],
        },
        onError: {
          target: 'reviewing',
          actions: 'storeFailure',
        },
      },
      on: {
        CANCEL: {
          target: 'reviewing',
          actions: 'clearError',
        },
      },
    },
    success: {
      on: {
        SYNC_CART: [
          {
            guard: 'incomingCartIsNotEmpty',
            target: 'reviewing',
            actions: ['syncCart', 'clearError'],
          },
          {
            actions: 'syncCart',
          },
        ],
      },
    },
  },
});
