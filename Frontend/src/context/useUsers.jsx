import { useState, useCallback } from 'react'

const API_BASE_URL = 'http://localhost:5000/api'

export const useUsers = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const register = useCallback(async (userData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при регистрации')
            }

            return data.user
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    const login = useCallback(async (credentials) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при авторизации')
            }

            return data.user
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    const getUserById = useCallback(async (userId) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Пользователь не найден')
            }

            return data.user
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    const updateUser = useCallback(async (userId, userData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при обновлении профиля')
            }

            return data.user
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Получение всех пользователей (для админки)
     */
    const getAllUsers = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/users`)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.error || 'Ошибка при загрузке пользователей'
                )
            }

            return data.users
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Удаление пользователя
     */
    const deleteUser = useCallback(async (userId) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.error || 'Ошибка при удалении пользователя'
                )
            }

            return data
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        loading,
        error,
        register,
        login,
        getUserById,
        updateUser,
        getAllUsers,
        deleteUser,
    }
}
