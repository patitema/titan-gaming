import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../../store/slices/usersSlice'
import './Registration.css'

function Registration() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
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

        // Валидация обязательных полей
        if (!formData.username || !formData.email || !formData.password) {
            setError('Заполните все обязательные поля')
            return
        }

        try {
            await dispatch(registerUser(formData)).unwrap()
            navigate('/profile') // после удачи — на профиль
        } catch (err) {
            setError(err)
        }
    }
    return (
        <div>
            <main>
                <div className="main-container">
                    <h3>Регистрация</h3>
                    <form id="login-form" onSubmit={handleSubmit}>
                        {error && <p className="error">{error}</p>}
                        <input
                            type="text"
                            name="username"
                            placeholder="Имя пользователя"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
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
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Телефон (необязательно)"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Адрес (необязательно)"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <button type="submit" id="reg-btn">
                            Зарегистрироваться
                        </button>
                        <Link to="/login">
                            <button type="button" id="change-log-btn">
                                Войти
                            </button>
                        </Link>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Registration
