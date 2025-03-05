import React from 'react';
import './brands.css';
import MSI from "../../assets/images/msi-brand.png"
import ASUS from "../../assets/images/Asus-brand.png"
import Intel from "../../assets/images/Intel-brand.png"
import AMD from "../../assets/images/Amd-brand.png"
import Nvidia from "../../assets/images/Nvidia-brand.png"
import Gigabyte from "../../assets/images/Gigabyte-brand.png"
import GSkill from "../../assets/images/Gskill-brand.png"


const Footer = () => {
    return (
    <div class="container_br">
        <ul class="brands">
            <li><img src={MSI}></img></li>
            <li><img src={ASUS}></img></li>
            <li><img src={Intel}></img></li>
            <li><img src={AMD}></img></li>
            <li><img src={Nvidia}></img></li>
            <li><img src={Gigabyte}></img></li>
            <li><img src={GSkill}></img></li>
        </ul>
    </div>
    );
};

export default Footer;