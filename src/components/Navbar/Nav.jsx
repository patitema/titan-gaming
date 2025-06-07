import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <img className='Logo' src="/images/Logo.png" alt="Логотип" />
            <ul className="pages-list">
                <li><Link to="/"><p>Главная</p></Link></li>
                <li><Link to="/catalog"><p>Каталог</p></Link></li>
            </ul>

            <div className='Nav-btns'>
                <Link className='Karzina-btn' to="/karzina">
                    <button className='Karzina-btn'>
                        <svg>
                            <use href={`/images/icons.svg#icon-karzina`}></use>
                        </svg>
                    </button>
                </Link>
                <Link  to="/profile">
                    <button className="profile-btn" type='button'>
                        <svg width="100" height="100">
                            <use href={`/images/icons.svg#icon-profile`}></use>
                        </svg>
                    </button>
                </Link>
                
            </div>
        </nav>
    );
};

export default Nav;