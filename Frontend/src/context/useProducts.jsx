import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useProducts = () => {
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const handleProducts = () => {
        fetch('http://localhost:5000/api/products', { cache: 'no-store' })
            .then((res) => res.json())
            .then((data) => setProducts(data.products))
        console.log(setProducts())
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
        if (searchParams.get('filter')) {
            setProducts(
                products?.filter((p) => p.type === searchParams.get('filter'))
            )
        }
    }

    useEffect(() => {
        handleProducts()
    }, [])
    useEffect(() => {
        handleFilterProduct()
    }, [searchParams])
    return { products, handleSortProducts }
}
