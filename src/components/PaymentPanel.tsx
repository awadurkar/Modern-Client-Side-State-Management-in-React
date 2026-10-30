import { useSelector } from '@xstate/react';
import { useCheckoutActor } from '../checkout/CheckoutProvider';

function PaymentPanel() {
  const actor = useCheckoutActor();
  const isReviewing = useSelector(actor, (snapshot) => snapshot.matches('reviewing'));
  const isSubmitting = useSelector(actor, (snapshot) => snapshot.matches('submitting'));
  const isSuccess = useSelector(actor, (snapshot) => snapshot.matches('success'));
  const orderId = useSelector(actor, (snapshot) => snapshot.context.order?.id ?? null);
  const error = useSelector(
    actor,
    (snapshot) => (snapshot.matches('reviewing') ? snapshot.context.error : null),
  );
  const canSubmit = useSelector(actor, (snapshot) => snapshot.can({ type: 'SUBMIT' }));

  return (
    <section className="payment-panel" aria-labelledby="payment-title">
      <p className="eyebrow">CHECKOUT</p>
      <h2 id="payment-title">Payment</h2>
      <p className="payment-status" role="status">
        {isSubmitting && 'Submitting your order…'}
        {isReviewing && !error && 'Review your bag before placing your order.'}
        {isSuccess && `Order ${orderId} completed.`}
        {isReviewing && error && 'Your order could not be completed.'}
      </p>
      {error && <p className="checkout-error" role="alert">{error}</p>}
      <div className="payment-actions">
        {isSubmitting ? (
          <button
            className="payment-cancel-button"
            type="button"
            onClick={() => actor.send({ type: 'CANCEL' })}
          >
            Cancel
          </button>
        ) : (
          <button
            className="payment-submit-button"
            type="button"
            disabled={!canSubmit}
            onClick={() => actor.send({ type: 'SUBMIT' })}
          >
            Submit payment
          </button>
        )}
      </div>
    </section>
  );
}

export default PaymentPanel;
