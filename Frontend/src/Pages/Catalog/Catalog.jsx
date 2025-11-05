import React, { useEffect } from 'react'
import './Catalog.css'
import { Link, useLocation } from 'react-router-dom'
import { useProducts } from '../../context/useProducts'
import { CardProduct } from '../../components/Card/Card'

function Catalog() {
    const location = useLocation()
    const { handleSortProducts, products: newProducts } = useProducts()

    useEffect(() => {}, [location.search])

    return (
        <div>
            <header>
                <div className="container_filters">
                    <ul>
                        <li>
                            <Link to="/catalog?type=1">
                                <h2>Оптимальные</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog?type=2">
                                <h2>Игровые</h2>
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog?type=3">
                                <h2>Мощные</h2>
                            </Link>
                        </li>
                        <li>
                            <Link href="/catalog?type=?">
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
                            <CardProduct key={product.p_id} {...product} />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Catalog
