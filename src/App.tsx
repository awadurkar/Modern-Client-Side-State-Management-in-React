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

        <div className="shop-layout" id="catalog">
          <Catalog onAddToCart={addToCart} />
          <CartDrawer items={cartItems} onRemove={removeFromCart} />
        </div>

      </main>
    </div>
  );
}

export default App;
