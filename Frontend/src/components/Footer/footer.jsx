import React from 'react';
import './footer.css';

const Footer = () => {
    return (
    <footer>
        <div className="foot_container">
            <img src="/images/Logo.png" alt="Логотип"></img>
            <h3>Продажа компьютеров для игр.</h3>
            <ul>
                <li><p>Адрес: г. Барнаул, ул. Маршала Баграмяна, 3.</p></li>
                <li><p>График работы: 11:00 - 20:30 (Ежедневно)</p></li>
                <li><p>Телефон: +7 905 988 43 53</p></li>
            </ul>
        </div>
        
    </footer>
    );
};

export default Footer;