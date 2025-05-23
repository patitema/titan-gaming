import React from 'react';
import '../assets/styles/Login.css';
import Nav from "../components/Navbar/Nav";
import Footer from "../components/Footer/footer";
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <Nav />
            <main>
                <div className='main-container'>
                    <h3>Вход</h3>
                    <form id="login-form" action="" method='Post'>
                        <input type="text" placeholder='login/email'/>
                        <input type="password" placeholder='password'/>
                        <button type='submit' id='login-btn'>Войти</button>
                        <Link to="/registration">
                            <button type='button' id='change-reg-btn'>Зарегистрироваться</button>
                        </Link>
                        
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
