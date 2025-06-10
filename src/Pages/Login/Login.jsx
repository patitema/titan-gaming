import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Login.css';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [error,    setError]    = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login({ email, password });
            navigate("/profile");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            <main>
                <div className='main-container'>
                    <h3>Вход</h3>
                    <form id="login-form" onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <input type="text" placeholder='login/email' onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)}/>
                        <button type='submit' id='login-btn'>Войти</button>
                        <Link to="/registration">
                            <button type='button' id='change-reg-btn'>Зарегистрироваться</button>
                        </Link>
                        
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;
