import CartDrawer from './components/CartDrawer';
import Catalog from './components/Catalog';
import Header from './components/Header';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-content">

        <div className="shop-layout" id="catalog">
          <Catalog />
          <CartDrawer />
        </div>

      </main>
    </div>
  );
}

export default App;
