import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './Registration.css';

function Registration() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [name,     setName]     = useState("");
    const [error,    setError]    = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            register({ email, password, name });
            navigate("/profile"); // после удачи — на профиль
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            <main>
                <div className='main-container'>
                    <h3>Регистрация</h3>
                    <form id="login-form" onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} required/>
                        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} required/>
                        <input type="text" placeholder='name' onChange={e => setName(e.target.value)} required/>
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
