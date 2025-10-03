import React from 'react';
import './Product.css';


function Product() {
    return (
        <div>
            <main>
                <div className='container-porduct'>
                    <div>
                        <img src="/images/Header_pc.png" alt="Картинка продукта" />
                        <div className='head-info'>
                            <h2>Name</h2>
                            <p>discription</p>
                            <button className='Buy-btn'>10000Р</button>
                        </div>
                    </div>
                    <ul class="attributes-products">
                        <li class="attribute">
                            <p class="attr_name">Процессор</p>
                            <p class="attr"></p>
                        </li>
                        <li class="attribute">
                            <p class="attr_name">Видеокарта</p>
                            <p class="attr"></p>
                        </li>
                        <li class="attribute">
                            <p class="attr_name">Оперативная память</p>
                            <p class="attr"></p>
                        </li>
                        <li class="attribute">
                            <p class="attr_name">Диск SSD</p>
                            <p class="attr"></p>
                        </li>
                        <li class="attribute">
                            <p class="attr_name">Корпус</p>
                            <p class="attr"></p>
                        </li>
                        <li class="attribute">
                            <p class="attr_name">Система</p>
                            <p class="attr"></p>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default Product;
