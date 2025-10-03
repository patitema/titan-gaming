import React, { createContext, useState, useEffect, useContext } from "react";

// Обёртка для провайдера
export const ProductsContext = createContext();

// Функция для загрузки и безопасного извлечения массива товаров
async function fetchProductsFromJson(signal) {
  const res = await fetch("http://localhost:5000/api/products", { signal });
  const json = await res.json();

  // Поддерживаем несколько вариантов ответа: массив, { products: [...] }, {data: [...]}
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.products)) return json.products;
  if (Array.isArray(json.data)) return json.data;

  // Если ничего подходящего — вернём пустой массив (чтобы list.sort не ломался)
  return [];
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("popularity");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const all = await fetchProductsFromJson(signal);

        // Защита: гарантируем, что workingList — массив
        let workingList = Array.isArray(all) ? [...all] : [];

        // Фильтрация (если filter пустой — оставляем весь массив)
        if (filter) {
          workingList = workingList.filter((p) => {
            // Безопасно проверяем поле type — если его нет, исключаем элемент
            return p && p.type === filter;
          });
        }

        // Сортировка — безопасно (если поля отсутствуют, возвращаем 0)
        const getNumber = (v) => {
          if (v == null) return 0;
          const n = Number(v);
          return Number.isFinite(n) ? n : 0;
        };

        if (sortKey === "price-asc") {
          workingList.sort((a, b) => getNumber(a.price) - getNumber(b.price));
        } else if (sortKey === "price-desc") {
          workingList.sort((a, b) => getNumber(b.price) - getNumber(a.price));
        } else if (sortKey === "popularity") {
          // исправлен очевидный баг: было b.popularity - b.popularity
          workingList.sort((a, b) => getNumber(b.popularity) - getNumber(a.popularity));
        }

        if (mounted) setProducts(workingList);
      } catch (err) {
        if (err.name === "AbortError") {
          // отмена — ничего не делаем
        } else {
          console.error("Products load error:", err);
          if (mounted) {
            setError(err);
            setProducts([]);
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [filter, sortKey]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        filter,
        setFilter,
        sortKey,
        setSortKey,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

// Хук для доступа к контексту
export function useProducts() {
  return useContext(ProductsContext);
}
