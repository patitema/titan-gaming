import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './assets/styles/index.css';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductsContext } from "./context/ProductsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ProductsContext>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
    </ProductsContext>
  </AuthProvider>
);