import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import './Catalog.css'
import { fetchProducts, setFilter, setSortKey } from '../../store/slices/productsSlice'
import { CardProduct } from '../../components/Card/Card'

function Catalog() {
    const dispatch = useDispatch()
    const location = useLocation()
    
    const { products, loading, error } = useSelector((state) => state.products)
    
    const handleSortProducts = (type) => {
        dispatch(setSortKey(type))
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const type = params.get('type')
        dispatch(setFilter(type || ''))
        dispatch(fetchProducts({ filter: type || '', sortKey: 'popularity' }))
    }, [location.search, dispatch])

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
                            <Link to="/catalog">
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
                                onClick={() => handleSortProducts('popularity')}
                            >
                                По популярности
                            </p>
                        </li>
                    </ul>
                </div>
            </header>
            <main>
                {loading && <p>Загрузка продуктов...</p>}
                {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
                <div className="catalog-list">
                    <ul className="catalog">
                        {products?.map((product) => (
                            <CardProduct key={product.p_id} {...product} />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Catalog
