import React from 'react';
import '../assets/styles/General.css'
import Nav from "../components/Navbar/Nav"
import Footer from "../components/Footer/footer"
import Brands from "../components/Brands/brands"
import H_PC from "../assets/images/Header_pc.png"
import T_PC from "../assets/images/Titan Gaming PC.png"


function General() {
    return (
        <div>
            <Nav />
            <header>
                <div class="container">
                    <img src={H_PC} alt=""></img>
                </div>
                <h2>Серия <span>HYPERBASHMAK 3</span> уже в продаже</h2>
            </header>
            <main>
                <div class="About_company">
                    <div class="container">
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
                <div class="Slogan">
                    <div class="container">
                        <div class="img">
                            <img src={T_PC} alt=""></img>
                        </div>
                        <div class="text">
                            <h2>Не играй. <span>Доминируй!</span></h2>
                            <p>Наши ПК — это не просто железо. Это оружие, 
                            созданное для тех, кто сражается за каждый кадр, каждый фраг, 
                            каждый трофей. Для тех, кто не признает слова "лагать".
                            </p>
                        </div>
                    </div>
                </div>
                <div class="What_we_do">
                    <div class="container">
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
                <div class="Why_us">
                    <div class="container">
                        <h2>Пчему мы? <br></br> Наши преимущества: </h2>
                        <ul>
                            <li>
                                <div class="text_header"><h3>Качество</h3></div>
                                <div class="text_main">
                                    <p>Все пк собираются из новых и провереных комплектующих</p>
                                </div>
                            </li>
                            <li>
                                <div class="text_header"><h3>Стоимость</h3></div>
                                <div class="text_main">
                                    <p>Равновесная цена. ПК почти по себестоимости</p>
                                </div>
                            </li>
                            <li>
                                <div class="text_header"><h3>Скромность</h3></div>
                                <div class="text_main">
                                    <p>Быстрая сборка и доставка</p>
                                </div>
                            </li>
                            <li>
                                <div class="text_header"><h3>Рейтинг</h3></div>
                                <div class="text_main">
                                    <p>Отличная репутация на рынке и большое количество отзывов</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <Brands />
            </main>
            <Footer />
        </div>
    );
}

export default General;
