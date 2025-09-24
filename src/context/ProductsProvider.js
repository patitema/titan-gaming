import React, { createContext, useState, useEffect, useContext } from "react";

// Обёртка для провайдера
export const ProductsContext = createContext();

// Функция для загрузки и фильтрации товаров
async function fetchProductsFromJson() {
    const res = await fetch("http://localhost:5000/api/products");
    const json = await res.json();
    return json.products || json;
}

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [filter, setFilter]     = useState("");
    const [sortKey, setSortKey]   = useState("popularity");

  // При изменении фильтра или сортировки — перезагружаем
useEffect(() => {
    fetchProductsFromJson().then(all => {
        let list = filter ? all.filter(p => p.type === filter) : all;

        if (sortKey === "price-asc")    list.sort((a,b)=>a.price-b.price);
        else if (sortKey === "price-desc") list.sort((a,b)=>b.price-a.price);
        else if (sortKey === "popularity") list.sort((a,b)=>b.popularity-b.popularity);

        setProducts(list);
    });
}, [filter, sortKey]);

return (
    <ProductsContext.Provider value={{
        products,
        filter,    setFilter,
        sortKey,   setSortKey,
    }}>
    {children}
    </ProductsContext.Provider>
);
}

// Хук для доступа к контексту
export function useProducts() {
    return useContext(ProductsContext);
}
