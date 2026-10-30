import { create } from 'zustand';
import type { CartItem, CheckoutResult, Product } from '../types';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

interface CartStore {
  items: CartItem[];
  checkoutStatus: CheckoutStatus;
  checkoutError: string | null;
  lastOrder: CheckoutResult | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  checkout: () => Promise<void>;
}

function isOrderResponse(value: unknown): value is { id: string | number } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    (typeof value.id === 'string' || typeof value.id === 'number')
  );
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  checkoutStatus: 'idle',
  checkoutError: null,
  lastOrder: null,
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);

    set({
      items: existingItem
        ? items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { ...product, quantity: 1 }],
      checkoutStatus: get().checkoutStatus === 'submitting' ? 'submitting' : 'idle',
      checkoutError: null,
      lastOrder: null,
    });
  },
  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.id !== productId),
      checkoutStatus: get().checkoutStatus === 'submitting' ? 'submitting' : 'idle',
      checkoutError: null,
      lastOrder: null,
    });
  },
  checkout: async () => {
    const { items, checkoutStatus } = get();
    if (items.length === 0 || checkoutStatus === 'submitting') {
      return;
    }

    const orderItems = items.map((item) => ({ ...item }));
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ checkoutStatus: 'submitting', checkoutError: null, lastOrder: null });

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: orderItems, total }),
      });

      if (!response.ok) {
        throw new Error(`Checkout request failed (${response.status})`);
      }

      const result: unknown = await response.json();
      if (!isOrderResponse(result)) {
        throw new Error('Checkout response did not contain a valid order ID');
      }

      set({
        checkoutStatus: 'success',
        checkoutError: null,
        lastOrder: { id: String(result.id), items: orderItems, total },
      });
    } catch (error) {
      set({
        checkoutStatus: 'error',
        checkoutError: error instanceof Error ? error.message : 'Unable to complete checkout',
      });
    }
  },
}));
