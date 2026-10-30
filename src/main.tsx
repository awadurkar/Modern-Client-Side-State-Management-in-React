import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CheckoutProvider } from './checkout/CheckoutProvider';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CheckoutProvider>
      <App />
    </CheckoutProvider>
  </React.StrictMode>,
);
