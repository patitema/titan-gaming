import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();
const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // При старте читаем из localStorage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setCart(JSON.parse(stored));
    }, []);

    // Синхронизируем в localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    // Добавить товар (id) в корзину
    const addToCart = (id) => {
        if (!cart.includes(id)) {
        setCart(prev => [...prev, id]);
        }
    };

    // Убрать товар из корзины
    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item !== id));
    };

    // Очистить корзину
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
        {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
