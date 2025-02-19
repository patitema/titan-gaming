import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import General from './Pages/General';
import Catalog from './Pages/Catalog';
import reportWebVitals from './reportWebVitals';
import './assets/styles/index.css'


const root = ReactDOM.createRoot(document.getElementById('root')); // Используем createRoot

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<General />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  </Router>
);

// Вызов reportWebVitals для сбора метрик производительности
reportWebVitals(console.log);
