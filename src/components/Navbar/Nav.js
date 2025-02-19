import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <img className='Logo' src="/images/Logo.png" alt="Логотип" />
            <ul className="pages-list">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/catalog">Каталог</Link></li>
            </ul>
            <button className='profile-btn' type='button'>
                <img src="/images/Profile.ico" alt="Профиль" />
            </button>
        </nav>
    );
};

export default Nav;