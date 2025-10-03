import React from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Nav = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const user = auth ? auth.user : null;

  const handleProfileClick = () => {
    navigate(user ? '/profile' : '/login');
  };

  return (
    <nav className="nav">
      <Link to="/" className="logo-link">
        <img className="Logo" src="/images/Logo.png" alt="Titan Gaming — логотип" />
      </Link>

      <ul className="pages-list">
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/catalog">Каталог</Link></li>
      </ul>

      <div className="Nav-btns">
        <Link to="/karzina" className="karzina-link" aria-label="Корзина">
          <svg className="icon icon-karzina" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <use href="/images/icons.svg#icon-karzina" />
          </svg>
        </Link>

        {/* Кнопка профиля вызывает navigate — нормальная семантика */}
        <button
          className="profile-btn"
          type="button"
          onClick={handleProfileClick}
          aria-label={user ? 'Профиль' : 'Вход'}
        >
          <svg className="icon icon-profile" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <use href="/images/icons.svg#icon-profile" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
