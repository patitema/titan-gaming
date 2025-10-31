import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export const CardProduct = (product) => {
    const { addToCart } = useCart()

    const handleBuyClick = (e) => {
        e.preventDefault() // Предотвращаем переход по ссылке
        addToCart(product.p_id)
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
