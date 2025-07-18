import React, { useEffect } from "react";
import './Catalog.css'
import { renderProducts, initializeSorting } from '../../context/products';
import { useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";

function Catalog() {
    const { products } = useProducts();
    const { addToCart, cart } = useCart();
    const location = useLocation();

    useEffect(() => {
        initializeSorting();
        renderProducts();
    }, [location.search]);
    return (
        <div>
            <header>
                <div className='container_filters'>
                    <ul>
                        <li>
                            <a href="/catalog?filter=optimal">
                            <h2>Оптимальные</h2></a>
                        </li>
                        <li>
                            <a href="/catalog?filter=gaming">
                            <h2>Игровые</h2></a>
                        </li>
                        <li>
                            <a href="/catalog?filter=porwerful">
                            <h2>Мощные</h2></a>
                        </li>
                        <li>
                            <a href="/catalog">
                            <h2>Все</h2></a>
                        </li>
                    </ul>
                </div>
                <div className='container_filters_down'>
                        <ul>
                            <li><p id="sort-cheap">Сначала дешевле</p></li>
                            <li><p id="sort-expensive">Сначала дороже</p></li>
                            <li><p id="sort-popularity">По популярности</p></li>
                        </ul>
                </div>
            </header>
            <main>
                <div className='catalog-list'>
                    <ul className="catalog"></ul>
                    <ul className='page_list'>
                        <li><button type='button'>1</button></li>
                        <li><button type='button'>2</button></li>
                        <li><button type='button'>3</button></li>
                        <li><button type='button'>...</button></li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default Catalog;
