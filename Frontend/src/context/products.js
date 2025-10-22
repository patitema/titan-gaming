let currentSortKey = 'popularity'

export function initializeSorting() {
    if (initializeSorting.hasRun) return
    initializeSorting.hasRun = true

    const sortConfig = [
        { id: 'sort-cheap', key: 'price-asc' },
        { id: 'sort-expensive', key: 'price-desc' },
        { id: 'sort-popularity', key: 'popularity' },
        { id: 'sort-none', key: '' },
    ]

    sortConfig.forEach(({ id, key }) => {
        const el = document.getElementById(id)
        if (!el) return
        el.addEventListener('click', () => {
            currentSortKey = key
            renderProducts()
        })
    })
}

function normalizeProduct(p) {
    return {
        id: p.p_id,
        name: p.p_name,
        processor: p.processor,
        videoCard: p.videoCard,
        ram: p.ram,
        drive: p.drive,
        case: p.casePC,
        system: p.system,
        price: p.price === undefined || p.price === null ? 0 : Number(p.price),
        image: p.image,
        type: p.type,
        popularity: Number(p.popularity ?? 0),
    }
}

export async function renderProducts() {
    const productList = document.querySelector('.catalog')
    if (!productList) return

    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') || ''

    productList.innerHTML = '<li>Загрузка...</li>'

    try {
        const res = await fetch('http://localhost:5000/api/products', {
            cache: 'no-store',
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const payload = await res.json()

        const raw = Array.isArray(payload)
            ? payload
            : payload.products ?? payload
        const allProducts = (Array.isArray(raw) ? raw : []).map(
            normalizeProduct
        )
        const products = filter
            ? allProducts.filter((p) => p.type === filter)
            : allProducts

        if (currentSortKey === 'price-asc') {
            products.sort(
                (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
            )
        } else if (currentSortKey === 'price-desc') {
            products.sort(
                (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
            )
        } else if (currentSortKey === 'popularity') {
            products.sort(
                (a, b) =>
                    (Number(b.popularity) || 0) - (Number(a.popularity) || 0)
            )
        }

        if (!products.length) {
            productList.innerHTML = '<li>Товары не найдены</li>'
            return
        }

        // productList.innerHTML = products.map(product =>
        //    (<li class="product-card">
        //     <a href="/product/${product.id}">
        //       <div class="container-card">
        //         <div class="head_container">
        //           <img src="${product.image}" alt="${product.name}" />
        //           <h3>${product.name}</h3>
        //         </div>
        //         <div class="main_container">
        //           <ul class="attributes">
        //             <li class="attribute"><p class="attr_name">Процессор</p><p class="attr">{product.processor}</p></li>
        //             <li class="attribute"><p class="attr_name">Видеокарта</p><p class="attr">{product.videoCard}</p></li>
        //             <li class="attribute"><p class="attr_name">Оперативная память</p><p class="attr">{product.ram}</p></li>
        //             <li class="attribute"><p class="attr_name">Диск SSD</p><p class="attr">{product.drive}</p></li>
        //             <li class="attribute"><p class="attr_name">Корпус</p><p class="attr">{product.case}</p></li>
        //             <li class="attribute"><p class="attr_name">Система</p><p class="attr">{product.system}</p></li>
        //           </ul>
        //           <button>${Number(product.price).toLocaleString('ru-RU')}₽</button>
        //         </div>
        //       </div>
        //     </a>
        //   </li>)
        // );
    } catch (finalErr) {
        console.error('Ошибка рендеринга товаров:', finalErr)
        productList.innerHTML = '<li>Ошибка загрузки товаров</li>'
    }
}
