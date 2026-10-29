interface CartBadgeProps {
  itemCount: number;
}

function CartBadge({ itemCount }: CartBadgeProps) {
  return (
    <span className="cart-badge" aria-label={`${itemCount} items in bag`}>
      {itemCount.toString().padStart(2, '0')}
    </span>
  );
}

export default CartBadge;
