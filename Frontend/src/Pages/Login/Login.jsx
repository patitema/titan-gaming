import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

function Login() {
    const { login, loading } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.email || !formData.password) {
            setError('Заполните все поля')
            return
        }

        try {
            await login(formData)
            navigate('/profile')
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <div>
            <main>
                <div className="main-container">
                    <h3>Вход</h3>
                    <form id="login-form" onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" id="login-btn">
                            Войти
                        </button>
                        <Link to="/registration">
                            <button type="button" id="change-reg-btn">
                                Зарегистрироваться
                            </button>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Login
