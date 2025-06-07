import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';

// Pages
import General from './Pages/General/General';
import Catalog from './Pages/Catalog/Catalog';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Product from './Pages/Product/Product';
import Registration from './Pages/Registration/Registration';
import Karzina from './Pages/Karzina/Karzina';
import NotFound from './Pages/404/404';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<General />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product" element={<Product />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/karzina" element={<Karzina />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;