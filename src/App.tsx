import { useState } from 'react';
import CartDrawer from './components/CartDrawer';
import Catalog from './components/Catalog';
import Header from './components/Header';
import type { CartItem, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="app-shell">
      <Header itemCount={itemCount} />
      <main className="page-content">
        <section className="welcome-panel" aria-labelledby="page-title">
          <div className="welcome-copy">
            <p className="eyebrow">THE EVERYDAY EDIT</p>
            <h1 id="page-title">Make room for<br />better work.</h1>
            <p className="welcome-description">
              Thoughtful tools for your desk, picked to make every day feel a
              little more considered.
            </p>
            <a className="text-link" href="#catalog">Explore the collection <span aria-hidden="true">↓</span></a>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="art-sun" />
            <div className="art-ring" />
            <div className="art-keyboard">
              <span /><span /><span /><span /><span /><span /><span /><span /><span />
            </div>
            <span className="art-caption">DESK ESSENTIALS / Nº 04</span>
          </div>
        </section>

        <div className="shop-layout" id="catalog">
          <Catalog onAddToCart={addToCart} />
          <CartDrawer items={cartItems} onRemove={removeFromCart} />
        </div>

        <footer className="page-footer" id="about">
          <span>SHOPCART — GOOD THINGS, WELL MADE.</span>
          <span>BUILT FOR THE WAY YOU WORK.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
