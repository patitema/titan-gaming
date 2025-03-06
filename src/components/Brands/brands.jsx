import React from 'react';
import './brands.css';
import MSI from "../../assets/images/msi-brand.png";
import ASUS from "../../assets/images/Asus-brand.png";
import Intel from "../../assets/images/Intel-brand.png";
import AMD from "../../assets/images/Amd-brand.png";
import Nvidia from "../../assets/images/Nvidia-brand.png";
import Gigabyte from "../../assets/images/Gigabyte-brand.png";
import GSkill from "../../assets/images/Gskill-brand.png";

const Footer = () => {
    return (
        <div className="container_br">
            <ul className="brands">
                <li><img src={MSI} alt="MSI" /></li>
                <li><img src={ASUS} alt="ASUS" /></li>
                <li><img src={Intel} alt="Intel" /></li>
                <li><img src={AMD} alt="AMD" /></li>
                <li><img src={Nvidia} alt="Nvidia" /></li>
                <li><img src={Gigabyte} alt="Gigabyte" /></li>
                <li><img src={GSkill} alt="GSkill" /></li>
            </ul>
        </div>
    );
};

export default Footer;
