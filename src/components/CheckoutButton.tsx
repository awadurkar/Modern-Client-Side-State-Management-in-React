import { useSelector } from '@xstate/react';
import { useCheckoutActor } from '../checkout/CheckoutProvider';

function CheckoutButton() {
  const actor = useCheckoutActor();
  const canSubmit = useSelector(actor, (snapshot) => snapshot.can({ type: 'SUBMIT' }));

  return (
    <button
      className="checkout-button"
      type="button"
      disabled={!canSubmit}
      onClick={() => actor.send({ type: 'SUBMIT' })}
    >
      <span>Continue to checkout</span>
      <span aria-hidden="true">↗</span>
    </button>
  );
}

export default CheckoutButton;
