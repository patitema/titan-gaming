import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react'
import { useAuth } from './AuthContext'
import { useCart as useCartApi } from './useCart'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const { user } = useAuth()
    const {
        getCart,
        addToCart: apiAddToCart,
        removeFromCart: apiRemoveFromCart,
    } = useCartApi()

    const loadCart = useCallback(async () => {
        if (!user || !user.id) return
        try {
            const cartItems = await getCart(user.id)
            setCart(cartItems)
        } catch (error) {
            console.error('Error loading cart:', error)
        }
    }, [user, getCart])

    // Загружаем корзину при изменении пользователя
    useEffect(() => {
        if (user && user.id) {
            loadCart()
        } else {
            setCart([])
        }
    }, [user, loadCart])

    // Добавить товар в корзину
    const addToCart = async (productId) => {
        if (!user || !user.id) {
            alert('Необходимо войти в систему')
            return
        }
        try {
            await apiAddToCart(productId, user.id)
            await loadCart() // Перезагружаем корзину
        } catch (error) {
            console.error('Error adding to cart:', error)
            alert('Ошибка при добавлении в корзину')
        }
    }

    // Убрать товар из корзины
    const removeFromCart = async (cartItemId) => {
        try {
            await apiRemoveFromCart(cartItemId)
            await loadCart() // Перезагружаем корзину
        } catch (error) {
            console.error('Error removing from cart:', error)
            alert('Ошибка при удалении из корзины')
        }
    }

    // Очистить корзину
    const clearCart = async () => {
        if (!user || !user.id) return
        try {
            // Удаляем все товары из корзины
            for (const item of cart) {
                await apiRemoveFromCart(item.id)
            }
            setCart([])
        } catch (error) {
            console.error('Error clearing cart:', error)
            alert('Ошибка при очистке корзины')
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, loadCart }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
