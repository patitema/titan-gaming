import React from 'react';
import '../assets/styles/General.css';
import Brands from "../components/Brands/brands";
import H_PC from "../assets/images/Header_pc.png";
import T_PC from "../assets/images/Titan Gaming PC.png";

function General() {
    return (
        <div>
            <header>
                <div className='container'>
                    <div className="container_shadow">
                        <img src={H_PC} alt="" />
                    </div>
                    <div className='conteiner_right'>
                        <h2>Серия <span>HYPERBASHMAK 3</span> уже в продаже</h2>
                        <button type='button' className='btn_buy'>Купить</button>
                    </div>
                </div>
                
            </header>
            <main>
                <div className="About_company">
                    <div className="container">
                        <ul>
                            <li><p>Titan Gaming — лидер в создании игровых ПК премиум-класса с 2015 года.
                        За 9 лет мы собрали более 50,000 систем для геймеров, стримеров и киберспортсменов
                        по всему миру.</p></li>
                            <li><p>Наша миссия проста: превращать передовые технологии в оружие для ваших побед.</p></li>
                            <li><p>От тесного гаража с энтузиастами до лаборатории с инженерами-геймерами — мы сохранили главное:
                            страсть к идеальному FPS, ненависть к лагам и веру в то, что играть нужно только на лучшем.</p></li>
                        </ul>
                    </div>
                </div>
                <div className="Slogan">
                    <div className="container">
                        <div className="imga">
                            <img src={T_PC} alt="" />
                        </div>
                        <div className="text">
                            <h2>Не играй. <span>Доминируй!</span></h2>
                            <p>Наши ПК — это не просто железо. Это оружие, 
                            созданное для тех, кто сражается за каждый кадр, каждый фраг, 
                            каждый трофей. Для тех, кто не признает слова "лагать".
                            </p>
                        </div>
                    </div>
                </div>
                <div className="What_we_do">
                    <div className="container">
                        <h2>Что мы делаем?</h2>
                        <ul>
                            <li><p>Собираем игровые ПК, которые бьют рекорды 
                            производительности (и выглядят как арт-объекты).</p></li>
                            <li><p>Кастомизируем каждую деталь: от процессоров 
                            до подсветки, которая пульсирует в такт вашим победам.</p></li>
                            <li><p>Тестируем системы в экстремальных условиях: 24-часовые 
                            стресс-тесты, VR-марафоны, рендеринг 8K.</p></li>
                            <li><p>Поддерживаем вас даже после покупки: бесплатный 
                            апгрейд ПО, гарантия 5 лет, сообщество титанов.</p></li>
                        </ul>
                    </div>
                </div>
                <div className="Why_us">
                    <div className="container">
                        <h2>Почему мы? <br /> Наши преимущества: </h2>
                        <ul>
                            <li>
                                <div className="text_header"><h3>Качество</h3></div>
                                <div className="text_main">
                                    <p>Все ПК собираются из новых и проверенных комплектующих</p>
                                </div>
                            </li>
                            <li>
                                <div className="text_header"><h3>Стоимость</h3></div>
                                <div className="text_main">
                                    <p>Равновесная цена. ПК почти по себестоимости</p>
                                </div>
                            </li>
                            <li>
                                    <div className="text_header"><h3>Скорость</h3></div>
                                    <div className="text_main">
                                        <p>Быстрая сборка и доставка</p>
                                    </div>
                            </li>
                            <li>
                                <div className="text_header"><h3>Рейтинг</h3></div>
                                <div className="text_main">
                                    <p>Отличная репутация на рынке и большое количество отзывов</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <Brands />
            </main>
        </div>
    );
}

export default General;
