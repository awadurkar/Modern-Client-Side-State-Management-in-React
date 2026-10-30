import { useEffect } from 'react';
import { useCheckoutActor } from './CheckoutProvider';
import { useCartStore } from '../store/cartStore';

function OrderCompletionBridge() {
  const actor = useCheckoutActor();

  useEffect(() => {
    const subscription = actor.on('ORDER_COMPLETED', () => {
      useCartStore.getState().clearCart();
    });

    return () => subscription.unsubscribe();
  }, [actor]);

  return null;
}

export default OrderCompletionBridge;
