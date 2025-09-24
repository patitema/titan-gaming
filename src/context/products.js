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

function normalizeImageUrl(img) {
  if (!img) return "";
  // если уже абсолютный URL — используем как есть
  try {
    const u = new URL(img);
    return u.href;
  } catch (e) {
    // относительный путь — добавляем origin
    if (!img.startsWith("/")) img = "/" + img;
    return window.location.origin + img;
  }
}

function normalizeProduct(p) {
  // Сервер у нас возвращает поля: p_id, p_name, processor, videoCard, ram, drive, casePC, system, price, image, type, popularity
  return {
    id: p.p_id ?? p.id ?? null,
    name: p.p_name ?? p.name ?? "",
    processor: p.processor ?? "",
    videoCard: p.videoCard ?? p.video_card ?? "",
    ram: p.ram ?? "",
    drive: p.drive ?? "",
    case: p.casePC ?? p.case ?? "",
    system: p.system ?? "",
    price: (p.price === undefined || p.price === null) ? 0 : Number(p.price),
    image: normalizeImageUrl(p.image ?? ""),
    type: p.type ?? "",
    popularity: Number(p.popularity ?? 0),
  };
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function renderProducts() {
  const productList = document.querySelector(".catalog");
  if (!productList) return;

  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter") || "";

  // краткий индикатор загрузки
  productList.innerHTML = "<li>Загрузка...</li>";

  try {
    const res = await fetch("http://localhost:5000/api/products", { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();

    const raw = Array.isArray(payload) ? payload : (payload.products ?? payload);

    const allProducts = (Array.isArray(raw) ? raw : []).map(normalizeProduct);

    const products = filter ? allProducts.filter(p => p.type === filter) : allProducts;

    if (currentSortKey === "price-asc") {
      products.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (currentSortKey === "price-desc") {
      products.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (currentSortKey === "popularity") {
      products.sort((a, b) => (Number(b.popularity) || 0) - (Number(a.popularity) || 0));
    }

    productList.innerHTML = "";
    if (!products.length) {
      productList.innerHTML = "<li>Товары не найдены</li>";
      return;
    }

    products.forEach((product) => {
      const li = document.createElement("li");
      li.className = "product-card";
      li.innerHTML = `
        <a href="/product/${product.id}">
          <div class="container-card">
            <div class="head_container">
              <img src="${product.image || (window.location.origin + '/images/placeholder.png')}" alt="${escapeHtml(product.name)}" />
              <h3>${escapeHtml(product.name)}</h3>
            </div>
            <div class="main_container">
              <ul class="attributes">
                <li class="attribute">
                  <p class="attr_name">Процессор</p>
                  <p class="attr">${escapeHtml(product.processor)}</p>
                </li>
                <li class="attribute">
                  <p class="attr_name">Видеокарта</p>
                  <p class="attr">${escapeHtml(product.videoCard)}</p>
                </li>
                <li class="attribute">
                  <p class="attr_name">Оперативная память</p>
                  <p class="attr">${escapeHtml(product.ram)}</p>
                </li>
                <li class="attribute">
                  <p class="attr_name">Диск SSD</p>
                  <p class="attr">${escapeHtml(product.drive)}</p>
                </li>
                <li class="attribute">
                  <p class="attr_name">Корпус</p>
                  <p class="attr">${escapeHtml(product.case)}</p>
                </li>
                <li class="attribute">
                  <p class="attr_name">Система</p>
                  <p class="attr">${escapeHtml(product.system)}</p>
                </li>
              </ul>
              <button>${Number(product.price).toLocaleString('ru-RU')}₽</button>
            </div>
          </div>
        </a>
      `;
      productList.appendChild(li);
    });
  } catch (finalErr) {
    console.error("Ошибка рендеринга товаров:", finalErr);
    productList.innerHTML = "<li>Ошибка загрузки товаров</li>";
  }
}
