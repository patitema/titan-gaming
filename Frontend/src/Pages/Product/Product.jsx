import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchProducts } from '../../store/slices/productsSlice'
import { addToCartAsync } from '../../store/slices/cartSlice'
import { selectUser } from '../../store/slices/authSlice'
import './Product.css'

function Product() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const products = useSelector((state) => state.products.products)
    const user = useSelector(selectUser)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError(null)
                
                // Сначала загружаем все продукты
                await dispatch(fetchProducts({ filter: '', sortKey: 'popularity' }))
            } catch (err) {
                setError(err.message || 'Ошибка загрузки продукта')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id, dispatch])

    useEffect(() => {
        // Находим нужный продукт из загруженных
        if (products.length > 0 && id) {
            const foundProduct = products.find(p => p.p_id === Number(id))
            if (foundProduct) {
                setProduct(foundProduct)
            } else {
                setError('Продукт не найден')
                setLoading(false)
            }
        }
    }, [products, id])

    const handleBuyClick = async () => {
        if (product && user && user.id) {
            try {
                await dispatch(addToCartAsync({
                    product_id: product.p_id,
                    user_id: user.id,
                    payment_type: 'cash'
                })).unwrap()
                alert('Товар добавлен в корзину!')
            } catch (err) {
                alert('Ошибка добавления в корзину: ' + err)
            }
        } else if (!user) {
            alert('Для добавления в корзину необходимо войти в систему')
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
