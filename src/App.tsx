import CartDrawer from './components/CartDrawer';
import Catalog from './components/Catalog';
import Header from './components/Header';
import PaymentPanel from './components/PaymentPanel';
import CartSynchronizer from './checkout/CartSynchronizer';
import OrderCompletionBridge from './checkout/OrderCompletionBridge';

function App() {
  return (
    <div className="app-shell">
      <CartSynchronizer />
      <OrderCompletionBridge />
      <Header />
      <main className="page-content">

        <div className="shop-layout" id="catalog">
          <Catalog />
          <CartDrawer />
          <PaymentPanel />
        </div>

      </main>
    </div>
  );
}

export default App;
