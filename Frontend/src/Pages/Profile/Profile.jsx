import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useUsers } from '../../context/useUsers'
import './Profile.css'

function Profile() {
    const { user, logout, refreshUser } = useAuth()
    const { updateUser } = useUsers()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        // Загружаем данные пользователя из контекста
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: user.password || '',
                phone: user.phone || '',
                address: user.address || '',
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!user) {
            setError('Пользователь не найден')
            return
        }

        try {
            await updateUser(user.id, formData)

            // Обновляем данные в контексте
            await refreshUser()

            setSuccess('Данные профиля успешно сохранены')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleLogout = () => {
        logout()
    }

    if (!user) {
        return (
            <p>
                Пожалуйста, <a href="/login">войдите</a> для доступа к кабинету.
            </p>
        )
    }

    return (
        <div>
            <main>
                <div className="profile-container">
                    <h3>Личный кабинет</h3>
                    <form onSubmit={handleSubmit} className="form-profile">
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                        <ul className="list-profile">
                            {[
                                {
                                    label: 'Имя пользователя',
                                    name: 'username',
                                    type: 'text',
                                },
                                {
                                    label: 'Email',
                                    name: 'email',
                                    type: 'email',
                                },
                                {
                                    label: 'Пароль',
                                    name: 'password',
                                    type: 'password',
                                },
                                {
                                    label: 'Телефон',
                                    name: 'phone',
                                    type: 'tel',
                                },
                                {
                                    label: 'Адрес',
                                    name: 'address',
                                    type: 'text',
                                },
                            ].map((field) => (
                                <li key={field.name} className="profile-item">
                                    <label htmlFor={field.name}>
                                        {field.label}:
                                    </label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        autocomplete="off"
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="profile-actions">
                            <button type="submit" className="save-btn">
                                Сохранить
                            </button>
                            <button
                                type="button"
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Выйти
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Profile
