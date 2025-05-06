import React from 'react';
import '../assets/styles/Profile.css';
import Nav from "../components/Navbar/Nav";
import Footer from "../components/Footer/footer";
import icons from "../assets/images/icons.svg"

function Profile() {
    return (
        <div>
            <Nav />
            <main>
                <div className='profile-container'>
                    <h3>Личный кабинет</h3>
                    <form id='form-profile' action="" method='Request'>
                        <ul className='list-profile'>
                            <li>
                                <label htmlFor="name">Имя:
                                </label><input type="text" name='name' id='name' placeholder='Patitema'/> 
                                <button id='edit-btn'><svg><use href={`${icons}#icon-edit`}></use></svg></button>
                            </li>
                            <li>
                                <label htmlFor="email">Почта:</label>
                                <input type="email" name='email' id='email' placeholder='********@gmail.com' /> 
                                <button id='edit-btn'><svg><use href={`${icons}#icon-edit`}></use></svg></button>
                            </li>
                            <li>
                                <label htmlFor="password">Пароль:</label>
                                <input type="password" name='password' id='password' placeholder='*******' /> 
                                <button id='edit-btn'><svg><use href={`${icons}#icon-edit`}></use></svg></button>
                            </li>
                            <li>
                                <label htmlFor="tel">Телефон:</label>
                                <input type="tel" name='tel' id='tel' placeholder='89059884353' /> 
                                <button id='edit-btn'><svg><use href={`${icons}#icon-edit`}></use></svg></button>
                            </li>
                            <li>
                                <label htmlFor="adress">Адрес:</label>
                                <input type="text" name='adress' id='adress' placeholder='Ленина 46' /> 
                                <button id='edit-btn'><svg><use href={`${icons}#icon-edit`}></use></svg></button>
                            </li>
                        </ul>
                    </form>
                    <h2>Вы смотрели:</h2>
                    <ul className='list-watched'>
                        <li>
                            <img src="../assets/images/Bashmak.png" alt="" />
                            <p>Bashmak</p>
                        </li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;
