import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useProducts = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const handleProducts = (params = '') => {
        console.log('params', params)
        fetch(`http://localhost:5000/api/products${params}`, {
            cache: 'no-store',
        })
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
    }

    const handleSortProducts = (type) => {
        switch (type) {
            case 'price-asc':
                return setProducts(
                    products.sort(
                        (a, b) =>
                            (Number(a.price) || 0) - (Number(b.price) || 0)
                    )
                )
            case 'price-desc':
                return setProducts(
                    products.sort(
                        (a, b) =>
                            (Number(b.price) || 0) - (Number(a.price) || 0)
                    )
                )
        }
    }

    const handleFilterProduct = () => {
        if (searchParams.get('type')) {
            handleProducts(`?type=${searchParams.get('type')}`)
        }
    }

    useEffect(() => {
        handleProducts()
    }, [])
    useEffect(() => {
        console.log('hello --- 1213')
        handleFilterProduct()
    }, [searchParams])
    return { products, handleSortProducts }
}
