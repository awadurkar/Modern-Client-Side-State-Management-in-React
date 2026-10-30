import { useCartStore } from '../store/cartStore';

function CartBadge() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  return (
    <span className="cart-badge" aria-label={`${itemCount} items in bag`}>
      {itemCount.toString().padStart(2, '0')}
    </span>
  );
}

export default CartBadge;
