import React from 'react';
import './Catalog_list.css';
// import { Link } from 'react-router-dom';
import PC from '../../assets/images/Bashmak.png'

const CatalogList = () => {
    return (
        <div className='container_main'>
                    <ul className='catalog'>
                        <li>
                            <div className='head_container'>
                                <img src={PC} alt="Bashmak" />
                                <h3>Bashmak</h3>
                            </div>
                            <div className='main_container'>
                                <ul>
                                    <li>
                                        <p className='attr_name'>Процессор</p>
                                        <p className='attr'>AMD Ryzen 5 5600G 3600 МГц</p>
                                    </li>
                                    <li>
                                        <p className='attr_name'>Видеокарта</p>
                                        <p className='attr'>AMD Radeon RX Vega 7 8 Гб</p>
                                    </li>
                                    <li>
                                        <p className='attr_name'>Оперативная память</p>
                                        <p className='attr'>16Гб DDR4 3000 МГц</p>
                                    </li>
                                    <li>
                                        <p className='attr_name'>Диск SSD</p>
                                        <p className='attr'>500 Гб CN600 Pro M.2</p>
                                    </li>
                                    <li>
                                        <p className='attr_name'>Корпус</p>
                                        <p className='attr'>POWERCASE MISTRAL X4 W</p>
                                    </li>
                                    <li>
                                        <p className='attr_name'>Система</p>
                                        <p className='attr'>Windows 10</p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <ul className='page_list'>
                        <li><button>1</button></li>
                        <li><button>2</button></li>
                        <li><button>3</button></li>
                        <li><button>...</button></li>
                    </ul>
                </div>
    );
};

export default CatalogList;