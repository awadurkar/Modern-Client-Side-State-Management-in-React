import { useCartState } from '../context/CartContext';

function CartBadge() {
  const items = useCartState();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <span className="cart-badge" aria-label={`${itemCount} items in bag`}>
      {itemCount.toString().padStart(2, '0')}
    </span>
  );
}

export default CartBadge;
