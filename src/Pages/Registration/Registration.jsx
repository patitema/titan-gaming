import React from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';

function Registration() {
    return (
        <div>
            <main>
                <div className='main-container'>
                    <h3>Регистрация</h3>
                    <form id="login-form" action="" method='Post'>
                        <input type="email" placeholder='email'/>
                        <input type="password" placeholder='password'/>
                        <input type="text" placeholder='name'/>
                        <button type='submit' id='reg-btn'>Зарегистрироваться</button>
                        <Link to="/login">
                            <button type='button' id='change-log-btn'>Войти</button>
                        </Link>
                        
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Registration;
