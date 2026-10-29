import type { CartItem } from '../types';

interface CartItemsListProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
}

function CartItemsList({ items, onRemove }: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="empty-bag-mark" aria-hidden="true">＋</span>
        <p>Your bag is taking a breather.</p>
        <span>Find something that belongs on your desk.</span>
      </div>
    );
  }

  return (
    <ul className="cart-items-list">
      {items.map((item, index) => (
        <li className="cart-item" key={item.id}>
          <div className={`cart-item-art cart-item-art-${index % 4}`} aria-hidden="true">
            <span>{(index + 1).toString().padStart(2, '0')}</span>
          </div>
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>QTY {item.quantity.toString().padStart(2, '0')}</p>
            <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
              Remove
            </button>
          </div>
          <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}

export default CartItemsList;
