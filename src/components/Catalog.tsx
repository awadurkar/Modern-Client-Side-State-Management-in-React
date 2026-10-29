import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

function isProductList(value: unknown): value is Product[] {
  return (
    Array.isArray(value) &&
    value.every(
      (product) =>
        typeof product === 'object' &&
        product !== null &&
        typeof product.id === 'string' &&
        typeof product.name === 'string' &&
        typeof product.price === 'number' &&
        Number.isFinite(product.price),
    )
  );
}

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch('/api/products', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Catalog request failed (${response.status})`);
        }

        const result: unknown = await response.json();
        if (!isProductList(result)) {
          throw new Error('Catalog response did not contain valid products');
        }

        setProducts(result);
        setError(null);
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }
        setError(requestError instanceof Error ? requestError.message : 'Unable to load products');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadProducts();
    return () => controller.abort();
  }, []);

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CURATED FOR YOUR DESK</p>
          <h2 id="catalog-title">The collection<span className="heading-period">.</span></h2>
        </div>
        <span className="product-count">
          {isLoading ? 'LOADING' : `${products.length.toString().padStart(2, '0')} OBJECTS`}
        </span>
      </div>

      {isLoading && <p className="catalog-message">Gathering the good stuff...</p>}
      {error && (
        <div className="catalog-message catalog-error" role="alert">
          <p>{error}</p>
          <p>Make sure the mock API is running with <code>npm run server</code>.</p>
        </div>
      )}
      {!isLoading && !error && products.length === 0 && (
        <p className="catalog-message">There are no products to show right now.</p>
      )}
      {!error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Catalog;
