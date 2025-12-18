import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../../store/slices/authSlice'
import './Login.css'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { loading, error: authError } = useSelector((state) => state.auth)

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
            await dispatch(loginUser(formData)).unwrap()
            navigate('/profile')
        } catch (err) {
            setError(err)
        }
    }
    return (
        <div>
            <main>
                <div className="main-container">
                    <h3>Вход</h3>
                    <form id="login-form" onSubmit={handleSubmit}>
                        {(error || authError) && <p className="error">{error || authError}</p>}
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
                        <button type="submit" id="login-btn" disabled={loading}>
                            {loading ? 'Вход...' : 'Войти'}
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
