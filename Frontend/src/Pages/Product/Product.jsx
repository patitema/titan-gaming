import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Product.css'

function Product() {
    const { id } = useParams()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await fetch(
                    `http://localhost:5000/api/products/${id}`
                )
                if (!response.ok) {
                    throw new Error('Продукт не найден')
                }
                const data = await response.json()
                setProduct(data.product)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id])

    const handleBuyClick = () => {
        if (product) {
            addToCart(product.p_id)
        }
    }

    if (loading) {
        return (
            <div>
                <main>
                    <div className="container-porduct">
                        <p>Загрузка...</p>
                    </div>
                </main>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <main>
                    <div className="container-porduct">
                        <p>Ошибка: {error}</p>
                    </div>
                </main>
            </div>
        )
    }

    if (!product) {
        return (
            <div>
                <main>
                    <div className="container-porduct">
                        <p>Продукт не найден</p>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div>
            <main>
                <div className="container-porduct">
                    <div>
                        <img src={product.image} alt={product.p_name} />
                        <div className="head-info">
                            <h2>{product.p_name}</h2>
                            <button
                                className="Buy-btn"
                                onClick={handleBuyClick}
                            >
                                Купить -{' '}
                                {Number(product.price).toLocaleString('ru-RU')}₽
                            </button>
                        </div>
                    </div>
                    <ul className="attributes-products">
                        <li className="attribute">
                            <p className="attr_name">Процессор</p>
                            <p className="attr">{product.processor}</p>
                        </li>
                        <li className="attribute">
                            <p className="attr_name">Видеокарта</p>
                            <p className="attr">{product.videoCard}</p>
                        </li>
                        <li className="attribute">
                            <p className="attr_name">Оперативная память</p>
                            <p className="attr">{product.ram}</p>
                        </li>
                        <li className="attribute">
                            <p className="attr_name">Диск SSD</p>
                            <p className="attr">{product.drive}</p>
                        </li>
                        <li className="attribute">
                            <p className="attr_name">Корпус</p>
                            <p className="attr">{product.casePC}</p>
                        </li>
                        <li className="attribute">
                            <p className="attr_name">Система</p>
                            <p className="attr">{product.system}</p>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Product
