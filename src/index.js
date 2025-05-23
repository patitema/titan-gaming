import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import General from './Pages/General';
import Catalog from './Pages/Catalog';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Product from './Pages/Product';
import Registration from './Pages/Registration';
import reportWebVitals from './reportWebVitals';
import './assets/styles/index.css'
import Karzina from './Pages/Karzina';

const root = ReactDOM.createRoot(document.getElementById('root')); // Используем createRoot

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<General />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/pruduct" element={<Product />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/karzina" element={<Karzina />} />
    </Routes>
  </Router>
);

// Вызов reportWebVitals для сбора метрик производительности
reportWebVitals(console.log);
