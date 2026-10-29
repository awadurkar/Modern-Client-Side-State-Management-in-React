import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}

const productNotes = ['TACTILE BY DESIGN', 'MADE FOR LONG DAYS', 'LESS, BUT BETTER', 'A SOFTER GLOW'];

function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
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
      <button className="add-button" type="button" onClick={() => onAddToCart(product)}>
        Add to bag <span aria-hidden="true">+</span>
      </button>
    </article>
  );
}

export default ProductCard;
