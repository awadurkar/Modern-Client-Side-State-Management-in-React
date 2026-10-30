import { useEffect } from 'react';
import { useCheckoutActor } from './CheckoutProvider';
import { useCartStore } from '../store/cartStore';
import type { CartItem } from '../types';

function CartSynchronizer() {
  const actor = useCheckoutActor();

  useEffect(() => {
    const syncCart = (items: CartItem[]) => {
      actor.send({ type: 'SYNC_CART', items });
    };

    syncCart(useCartStore.getState().items);
    return useCartStore.subscribe((state, previousState) => {
      if (state.items !== previousState.items) {
        syncCart(state.items);
      }
    });
  }, [actor]);

  return null;
}

export default CartSynchronizer;
