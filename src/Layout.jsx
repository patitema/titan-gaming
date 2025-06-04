import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Navbar/Nav';
import Footer from './components/Footer/footer';

function Layout() {
    return (
        <>
        <Nav />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    );
}

export default Layout;