import { useSelector } from '@xstate/react';
import { useCheckoutActor } from '../checkout/CheckoutProvider';

function CartErrorBanner() {
  const actor = useCheckoutActor();
  const error = useSelector(actor, (snapshot) => snapshot.context.error);

  if (!error) {
    return null;
  }

  return <p className="checkout-error" role="alert">{error}</p>;
}

export default CartErrorBanner;
