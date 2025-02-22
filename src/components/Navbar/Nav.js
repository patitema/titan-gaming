import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import Logo from"../../assets/images/Logo.png"
import Profile from "../../assets/images/Profile.ico"

const Nav = () => {
    return (
        <nav>
            <img className='Logo' src={Logo} alt="Логотип" />
            <ul className="pages-list">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/catalog">Каталог</Link></li>
            </ul>
            <button className='profile-btn' type='button'>
                <img src={Profile} alt="Профиль" />
            </button>
        </nav>
    );
};

export default Nav;