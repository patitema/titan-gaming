import React from 'react';
import '../assets/styles/Catalog.css'
import CatalogList from "../components/Catalog/Catalog_list"

function Catalog() {
    return (
        <div>
            <header>
                <div className='container_filters'>
                    <ul>
                        <li><h2>Оптимальные</h2></li>
                        <li><h2>Игровые</h2></li>
                        <li><h2>Мощные</h2></li>
                    </ul>
                </div>
                <div className='container_filters_down'>
                        <ul>
                            <li><p>Цена</p></li>
                            <li><p>Популярность</p></li>
                            <li><p>Редкость</p></li>
                        </ul>
                    </div>
            </header>
            <main>
                <CatalogList />
            </main>
        </div>
    );
}

export default Catalog;
