import { useState, useCallback } from 'react'

const API_BASE_URL = 'http://localhost:5000/api'

export const useCart = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getCart = useCallback(async (userId) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/cart/${userId}`)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при загрузке корзины')
            }

            return data.cart
        } catch (err) {
            const errorMessage = err.message || 'Ошибка сети'
            setError(errorMessage)
            throw new Error(errorMessage)
        } finally {
            setLoading(false)
        }
    }, [])

    const addToCart = useCallback(
        async (productId, userId, paymentType = null) => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`${API_BASE_URL}/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        product_id: productId,
                        user_id: userId,
                        payment_type: paymentType,
                    }),
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.error || 'Ошибка при добавлении в корзину'
                    )
                }

                return data.id
            } catch (err) {
                const errorMessage = err.message || 'Ошибка сети'
                setError(errorMessage)
                throw new Error(errorMessage)
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const removeFromCart = useCallback(async (cartItemId) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при удалении из корзины')
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
        getCart,
        addToCart,
        removeFromCart,
    }
}
