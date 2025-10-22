import React, { createContext, useState, useEffect, useContext } from 'react'
import { useUsers } from './useUsers'

const AuthContext = createContext()

const SESSION_KEY = 'user_session'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const { login: apiLogin, getUserById } = useUsers()

    useEffect(() => {
        const loadSession = async () => {
            const sessionData = localStorage.getItem(SESSION_KEY)
            if (sessionData) {
                try {
                    const { userId } = JSON.parse(sessionData)
                    if (userId) {
                        try {
                            const userData = await getUserById(userId)
                            setUser(userData)
                        } catch (error) {
                            console.error('Error loading user session:', error)
                            localStorage.removeItem(SESSION_KEY)
                        }
                    }
                } catch (err) {
                    console.error('Error parsing session data:', err)
                    localStorage.removeItem(SESSION_KEY)
                }
            }
            setLoading(false)
        }

        loadSession()
    }, [getUserById])

    const login = async ({ email, password }) => {
        setLoading(true)
        try {
            const userData = await apiLogin({ email, password })
            setUser(userData)

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({ userId: userData.id })
            )

            return userData
        } catch (error) {
            setUser(null)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(SESSION_KEY)
    }

    const refreshUser = async () => {
        if (user && user.id) {
            setLoading(true)
            try {
                const freshUserData = await getUserById(user.id)
                setUser(freshUserData)
                return freshUserData
            } catch (error) {
                console.error('Error refreshing user data:', error)
                logout()
                throw error
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                refreshUser,
                loading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
