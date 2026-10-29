import CartItemsList from './CartItemsList';
import type { CartItem } from '../types';

interface CartDrawerProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
}

function CartDrawer({ items, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <aside className="cart-drawer" id="cart" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h2 id="cart-title">Your bag<span className="heading-period">.</span></h2>
        </div>
        <span className="cart-line-count">{itemCount.toString().padStart(2, '0')}</span>
      </div>

      <CartItemsList items={items} onRemove={onRemove} />

      <div className="cart-summary">
        <div className="subtotal-row">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <p className="shipping-note">Shipping and taxes calculated at checkout.</p>
        <button className="checkout-button" type="button" disabled={items.length === 0}>
          <span>Continue to checkout</span>
          <span aria-hidden="true">↗</span>
        </button>
        <p className="secure-note"><span aria-hidden="true">✳</span> CONSIDERED GOODS, CONSCIOUSLY MADE</p>
      </div>
    </aside>
  );
}

export default CartDrawer;
