import type { Product } from '../types';
import { useSetAtom } from 'jotai';
import { addCartItemAtom } from '../atoms/cartAtoms';

interface ProductCardProps {
  product: Product;
  index: number;
}

const productNotes = ['TACTILE BY DESIGN', 'MADE FOR LONG DAYS', 'LESS, BUT BETTER', 'A SOFTER GLOW'];

function ProductCard({ product, index }: ProductCardProps) {
  const addCartItem = useSetAtom(addCartItemAtom);
  const number = (index + 1).toString().padStart(2, '0');

  return (
    <article className={`product-card product-card-${index % 4}`}>
      <div className="product-art" aria-hidden="true">
        <span className="product-index">OBJECT {number}</span>
        <div className={`product-shape product-shape-${index % 4}`} />
        <span className="product-art-note">{productNotes[index % productNotes.length]}</span>
      </div>
      <div className="product-details">
        <div>
          <h3>{product.name}</h3>
          <p className="product-category">WORKSPACE / ESSENTIALS</p>
        </div>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>
      <button className="add-button" type="button" onClick={() => addCartItem(product)}>
        Add to bag <span aria-hidden="true">+</span>
      </button>
    </article>
  );
}

export default ProductCard;
