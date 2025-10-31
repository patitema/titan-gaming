import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useProducts } from '../../context/ProductsProvider'
import { useAuth } from '../../context/AuthContext'
import './Karzina.css'

function Karzina() {
    const { cart, removeFromCart } = useCart()
    const { products } = useProducts()
    const { user } = useAuth()
    const [cartProducts, setCartProducts] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        // Сопоставляем товары корзины с продуктами
        const mappedProducts = cart
            .map((cartItem) => {
                const product = products.find(
                    (p) => p.p_id === cartItem.products
                )
                return {
                    ...cartItem,
                    product,
                }
            })
            .filter((item) => item.product) // Убираем товары без продукта

        setCartProducts(mappedProducts)

        // Рассчитываем сумму
        const sum = mappedProducts.reduce(
            (acc, item) => acc + (Number(item.product?.price) || 0),
            0
        )
        setTotal(sum)
    }, [cart, products])

    const handleRemove = (cartItemId) => {
        removeFromCart(cartItemId)
    }

    if (!user) {
        return <div>Необходимо войти в систему для просмотра корзины</div>
    }

    return (
        <div>
            <main>
                <div className="offer-container">
                    <div className="form-part">
                        <h3>Информация по заказу</h3>
                        <form id="offer-form" action="" method="Post">
                            <div className="Names">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    placeholder="Имя"
                                    required
                                />
                                <input
                                    type="text"
                                    name="sec-name"
                                    id="sec-name"
                                    placeholder="Фамилия"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="adress"
                                id="adress"
                                placeholder="Адрес доставки/индекс"
                                required
                            />
                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                placeholder="Телефон"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Почта"
                                required
                            />
                            <input
                                type="textarea"
                                name="info-area"
                                id="info-area"
                                placeholder="Дополнительная информация по доставке"
                            />
                        </form>
                    </div>
                    <div className="info-part">
                        <h3>заказ</h3>
                        <ul className="info-list">
                            <li>
                                <p>Товар</p>
                                <p>Сумма</p>
                            </li>
                            <hr />
                            {cartProducts.length === 0 ? (
                                <li>
                                    <p>Корзина пуста</p>
                                </li>
                            ) : (
                                cartProducts.map((item) => (
                                    <li key={item.id}>
                                        <p>
                                            <span>
                                                {item.product?.p_name ||
                                                    'Неизвестный товар'}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                Удалить
                                            </button>
                                        </p>
                                        <p>
                                            <span>
                                                {Number(
                                                    item.product?.price || 0
                                                ).toLocaleString('ru-RU')}
                                                ₽
                                            </span>
                                        </p>
                                    </li>
                                ))
                            )}
                            <hr />
                            <li>
                                <p>Доствка</p>
                                <div className="choose-dellivery">
                                    <li>
                                        <label htmlFor="yourself">
                                            Самовывоз
                                        </label>
                                        <input
                                            form="offer-form"
                                            type="radio"
                                            name="dellivery"
                                            id="yourself"
                                            required
                                        />
                                    </li>
                                    <li>
                                        <label htmlFor="dellivery">
                                            Доствка
                                        </label>
                                        <input
                                            form="offer-form"
                                            type="radio"
                                            name="dellivery"
                                            id="dellivery"
                                            required
                                        />
                                    </li>
                                </div>
                            </li>
                            <hr />
                            <li>
                                <p>Итого</p>
                                <p>
                                    <span id="summ">
                                        {total.toLocaleString('ru-RU')}₽
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <button id="offer-btn" type="submit" form="offer-form">
                            Оформить
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Karzina
