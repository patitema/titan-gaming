import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartAsync } from '../../store/slices/cartSlice'
import { selectUser } from '../../store/slices/authSlice'

export const CardProduct = (product) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const handleBuyClick = (e) => {
        e.preventDefault()
        if (user && user.id) {
            dispatch(addToCartAsync({
                product_id: product.p_id,
                user_id: user.id,
                payment_type: 'cash'
            }))
        } else {
            alert('Для добавления в корзину необходимо войти в систему')
        }
    }

    return (
        <li className="product-card">
            <Link to={`/product/${product.p_id}`}>
                <div className="container-card">
                    <div className="head_container">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                    </div>
                    <div className="main_container">
                        <ul className="attributes">
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
                                <p className="attr">{product.case}</p>
                            </li>
                            <li className="attribute">
                                <p className="attr_name">Система</p>
                                <p className="attr">{product.system}</p>
                            </li>
                        </ul>
                        <button onClick={handleBuyClick}>
                            Купить -{' '}
                            {Number(product.price).toLocaleString('ru-RU')}₽
                        </button>
                    </div>
                </div>
            </Link>
        </li>
    )
}
