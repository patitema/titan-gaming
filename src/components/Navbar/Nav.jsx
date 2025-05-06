import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import Logo from"../../assets/images/Logo.png"
import icons from "../../assets/images/icons.svg"

const Nav = () => {
    return (
        <nav>
            <img className='Logo' src={Logo} alt="Логотип" />
            <ul className="pages-list">
                <li><Link to="/"><p>Главная</p></Link></li>
                <li><Link to="/catalog"><p>Каталог</p></Link></li>
            </ul>

            <div className='Nav-btns'>
                <Link className='Karzina-btn' to="/karzina">
                    <button className='Karzina-btn'>
                        <svg>
                            <use href={`${icons}#icon-karzina`}></use>
                        </svg>
                    </button>
                </Link>
                <Link  to="/profile">
                    <button className="profile-btn" type='button'>
                        <svg width="100" height="100">
                            <use href={`${icons}#icon-profile`}></use>
                        </svg>
                    </button>
                </Link>
                
            </div>
        </nav>
    );
};

export default Nav;