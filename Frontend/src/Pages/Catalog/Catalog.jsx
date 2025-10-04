import React, { useEffect } from 'react'
import './Catalog.css'
import { renderProducts, initializeSorting } from '../../context/products'
import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../../context/useProducts'
import { useCart } from '../../context/CartContext'
import { CardProduct } from '../../components/Card/Card'

function Catalog() {
    const location = useLocation()
    const { handleSortProducts, products: newProducts } = useProducts()

    useEffect(() => {
        initializeSorting()
    }, [location.search])

    console.log(newProducts)

    return (
        <div>
            <header>
                <div className="container_filters">
                    <ul>
                        <li>
                            <Link to="/catalog?filter=optimal">
                                <h2>Оптимальные</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog?filter=gaming">
                                <h2>Игровые</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog?filter=porwerful">
                                <h2>Мощные</h2>
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalog">
                                <h2>Все</h2>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="container_filters_down">
                    <ul>
                        <li>
                            <p
                                id="sort-cheap"
                                onClick={() => handleSortProducts('price-asc')}
                            >
                                Сначала дешевле
                            </p>
                        </li>
                        <li>
                            <p
                                id="sort-expensive"
                                onClick={() => handleSortProducts('price-desc')}
                            >
                                Сначала дороже
                            </p>
                        </li>
                        <li>
                            <p
                                id="sort-popularity"
                                onClick={() => handleSortProducts('price-asc')}
                            >
                                По популярности
                            </p>
                        </li>
                    </ul>
                </div>
            </header>
            <main>
                <div className="catalog-list">
                    <ul className="catalog">
                        {newProducts?.map((product) => (
                            <CardProduct {...product} />
                        ))}
                    </ul>
                    <ul className="page_list">
                        <li>
                            <button type="button">1</button>
                        </li>
                        <li>
                            <button type="button">2</button>
                        </li>
                        <li>
                            <button type="button">3</button>
                        </li>
                        <li>
                            <button type="button">...</button>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Catalog
