import { useAtomValue } from 'jotai';
import { cartItemCountAtom } from '../atoms/cartAtoms';

function CartBadge() {
  const itemCount = useAtomValue(cartItemCountAtom);

  return (
    <span className="cart-badge" aria-label={`${itemCount} items in bag`}>
      {itemCount.toString().padStart(2, '0')}
    </span>
  );
}

export default CartBadge;
