import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; productId: string };

const CartStateContext = createContext<CartItem[] | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch<CartAction> | undefined>(undefined);

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existingItem = items.find((item) => item.id === action.product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { ...action.product, quantity: 1 }];
    }
    case 'remove':
      return items.filter((item) => item.id !== action.productId);
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={items}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState(): CartItem[] {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
}

export function useCartDispatch(): Dispatch<CartAction> {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}
