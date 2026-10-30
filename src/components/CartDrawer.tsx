import { useAtomValue } from 'jotai';
import CartItemsList from './CartItemsList';
import { cartItemCountAtom, cartTotalAtom } from '../atoms/cartAtoms';

function CartDrawer() {
  const itemCount = useAtomValue(cartItemCountAtom);
  const total = useAtomValue(cartTotalAtom);

  return (
    <aside className="cart-drawer" id="cart" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h2 id="cart-title">Your bag<span className="heading-period">.</span></h2>
        </div>
        <span className="cart-line-count">{itemCount.toString().padStart(2, '0')}</span>
      </div>

      <CartItemsList />

      <div className="cart-summary">
        <div className="subtotal-row">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <p className="shipping-note">Shipping and taxes calculated at checkout.</p>
        <button className="checkout-button" type="button" disabled={itemCount === 0}>
          <span>Continue to checkout</span>
          <span aria-hidden="true">↗</span>
        </button>
        <p className="secure-note"><span aria-hidden="true">✳</span> CONSIDERED GOODS, CONSCIOUSLY MADE</p>
      </div>
    </aside>
  );
}

export default CartDrawer;
