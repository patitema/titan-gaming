import React from 'react';
import './brands.css';

const Footer = () => {
    return (
        <div className="container_br">
            <ul className="brands">
                <li><img src="/images/msi-brand.png" alt="MSI" /></li>
                <li><img src="/images/Asus-brand.png" alt="ASUS" /></li>
                <li><img src="/images/Intel-brand.png" alt="Intel" /></li>
                <li><img src="/images/Amd-brand.png" alt="AMD" /></li>
                <li><img src="/images/Nvidia-brand.png" alt="Nvidia" /></li>
                <li><img src="/images/Gigabyte-brand.png" alt="Gigabyte" /></li>
                <li><img src="/images/Gskill-brand.png" alt="GSkill" /></li>
            </ul>
        </div>
    );
};

export default Footer;
