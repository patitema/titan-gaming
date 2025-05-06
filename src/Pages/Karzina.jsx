import React from 'react';
import '../assets/styles/Karzina.css';
import Nav from "../components/Navbar/Nav";
import Footer from "../components/Footer/footer";

function Karzina() {
    return (
        <div>
            <Nav />
            <main>
                <div className='offer-container'>
                    <div className='form-part'>
                        <h3>Информация по заказу</h3>
                        <form id="offer-form" action="" method='Post'>
                            <div className='Names'>
                                <input type="text" name='first-name' id='first-name' placeholder='Имя' required/>
                                <input type="text" name='sec-name' id='sec-name' placeholder='Фамилия' required/>
                            </div>
                            <input type="text" name='adress' id='adress' placeholder='Адрес доставки/индекс' required/>
                            <input type="tel" name='tel' id='tel' placeholder='Телефон' required/>
                            <input type="email"name='email' id='email' placeholder='Почта' required/>
                            <input type="textarea" name='info-area' id='info-area' placeholder='Дополнительная информация по доставке'/>
                        </form>
                    </div>
                    <div className='info-part'>
                        <h3>заказ</h3>
                        <ul className='info-list'>
                            <li><p>Товар</p><p>Сумма</p></li>
                            <hr />
                            <li><p><span>Bashmak</span></p><p><span>50 000P</span></p></li>
                            <hr />
                            <li><p>Доствка</p>
                                <div className='choose-dellivery'>
                                    <li>
                                        <label htmlFor="yourself">Самовывоз</label>
                                        <input form="offer-form" type="radio" name="dellivery" id="yourself"  required/>
                                    </li>
                                    <li>
                                        <label htmlFor="dellivery">Доствка</label>
                                        <input form="offer-form" type="radio" name="dellivery" id="dellivery" required/>
                                    </li>
                                </div>
                            </li>
                            <hr />
                            <li><p>Итого</p><p><span id='summ'>50 000P</span></p></li>
                        </ul>
                        <button id='offer-btn' type='submit' form="offer-form">Оформить</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Karzina;
