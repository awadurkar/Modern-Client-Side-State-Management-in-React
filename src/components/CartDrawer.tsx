import CartItemsList from './CartItemsList';
import CartErrorBanner from './CartErrorBanner';
import CheckoutButton from './CheckoutButton';
import { useCartStore } from '../store/cartStore';

function CartDrawer() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
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
        <CartErrorBanner />
        <CheckoutButton />
        <p className="secure-note"><span aria-hidden="true">✳</span> CONSIDERED GOODS, CONSCIOUSLY MADE</p>
      </div>
    </aside>
  );
}

export default CartDrawer;
