let currentSortKey = "popularity";

export function initializeSorting() {
if (initializeSorting.hasRun) return;
initializeSorting.hasRun = true;

const sortConfig = [
    { id: "sort-cheap", key: "price-asc" },
    { id: "sort-expensive", key: "price-desc" },
    { id: "sort-popularity", key: "popularity" },
    { id: "sort-none", key: "" },
];

sortConfig.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", () => {
        currentSortKey = key;
        renderProducts();
    });
    });
}

export function renderProducts() {
const productList = document.querySelector(".catalog");
if (!productList) return;

  // 1) прочитать фильтр из URL
const params = new URLSearchParams(window.location.search);
const filter = params.get("filter") || "";

  // 2) сначала пробуем API
fetch("/api/products")
    .then((res) => {
        if (!res.ok) throw new Error("API error " + res.status);
        return res.json();
    })
    .catch((apiErr) => {
        console.warn("API /api/products failed:", apiErr.message);
      // при ошибке API — падаем на JSON
        return fetch("/data/products.json").then((res) => res.json()).then((data) => data.products || data);
    })
    .then((allProducts) => {
      // allProducts — либо из API, либо из JSON
    let products = filter
        ? allProducts.filter((p) => p.type === filter)
        : allProducts;

      // 3) сортировка
    if (currentSortKey === "price-asc") {
        products.sort((a, b) => a.price - b.price);
    } else if (currentSortKey === "price-desc") {
        products.sort((a, b) => b.price - a.price);
    } else if (currentSortKey === "popularity") {
        products.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

      // 4) рендер
    productList.innerHTML = "";
    if (!products.length) {
        productList.innerHTML = "<li>Товары не найдены</li>";
    return;
    }

    products.forEach((product) => {
    const li = document.createElement("li");
    li.className = "product-card";
    li.innerHTML = `
        <div class="container-card">
        <div class="head_container">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
        </div>
        <div class="main_container">
            <ul class="attributes">
            <li class="attribute">
                <p class="attr_name">Процессор</p>
                <p class="attr">${product.processor}</p>
            </li>
            <li class="attribute">
                <p class="attr_name">Видеокарта</p>
                <p class="attr">${product.videoCard}</p>
            </li>
            <li class="attribute">
                <p class="attr_name">Оперативная память</p>
                <p class="attr">${product.ram}</p>
            </li>
            <li class="attribute">
                <p class="attr_name">Диск SSD</p>
                <p class="attr">${product.drive}</p>
            </li>
            <li class="attribute">
                <p class="attr_name">Корпус</p>
                <p class="attr">${product.case}</p>
            </li>
            <li class="attribute">
                <p class="attr_name">Система</p>
                <p class="attr">${product.system}</p>
            </li>
            </ul>
            <button>${product.price}₽</button>
        </div>
        </div>
    `;
    productList.appendChild(li);
    });
    })
    .catch((finalErr) => {
        console.error("Ошибка рендеринга товаров:", finalErr);
        productList.innerHTML = "<li>Ошибка загрузки товаров</li>";
    });
}
