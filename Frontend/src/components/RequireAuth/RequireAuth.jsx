import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAuth({ children }) {
    const { isAuthenticated, loading } = useAuth()

    // Показываем загрузку пока проверяем авторизацию
    if (loading) {
        return <div>Загрузка...</div>
    }

    // Если пользователь не авторизован, перенаправляем на страницу входа
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Если пользователь авторизован, показываем защищенный контент
    return children
}
