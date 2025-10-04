import { Link } from 'react-router-dom'

export const CardProduct = (product) => {
    return (
        <li class="product-card">
            <Link to={`/product/${product.id}`}>
                <div class="container-card">
                    <div class="head_container">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                    </div>
                    <div class="main_container">
                        <ul class="attributes">
                            <li class="attribute">
                                <p class="attr_name">Процессор</p>
                                <p class="attr">{product.processor}</p>
                            </li>
                            <li class="attribute">
                                <p class="attr_name">Видеокарта</p>
                                <p class="attr">{product.videoCard}</p>
                            </li>
                            <li class="attribute">
                                <p class="attr_name">Оперативная память</p>
                                <p class="attr">{product.ram}</p>
                            </li>
                            <li class="attribute">
                                <p class="attr_name">Диск SSD</p>
                                <p class="attr">{product.drive}</p>
                            </li>
                            <li class="attribute">
                                <p class="attr_name">Корпус</p>
                                <p class="attr">{product.case}</p>
                            </li>
                            <li class="attribute">
                                <p class="attr_name">Система</p>
                                <p class="attr">{product.system}</p>
                            </li>
                        </ul>
                        <button>
                            {Number(product.price).toLocaleString('ru-RU')}₽
                        </button>
                    </div>
                </div>
            </Link>
        </li>
    )
}
