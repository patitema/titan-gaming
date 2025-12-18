import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:5000/api'

// Async thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ filter = '', sortKey = 'popularity' }, { rejectWithValue }) => {
        try {
            const url = `${API_BASE_URL}/products${filter ? `?type=${filter}` : ''}`
            const response = await fetch(url)
            const json = await response.json()
            
            // Поддерживаем несколько вариантов ответа: массив, { products: [...] }, {data: [...]}
            let products = []
            if (Array.isArray(json)) {
                products = json
            } else if (Array.isArray(json.products)) {
                products = json.products
            } else if (Array.isArray(json.data)) {
                products = json.data
            }
            
            // Сортировка на стороне клиента
            const getNumber = (v) => {
                if (v == null) return 0
                const n = Number(v)
                return Number.isFinite(n) ? n : 0
            }
            
            const sortedProducts = [...products]
            if (sortKey === 'price-asc') {
                sortedProducts.sort((a, b) => getNumber(a.price) - getNumber(b.price))
            } else if (sortKey === 'price-desc') {
                sortedProducts.sort((a, b) => getNumber(b.price) - getNumber(a.price))
            } else if (sortKey === 'popularity') {
                sortedProducts.sort((a, b) => getNumber(b.popularity) - getNumber(a.popularity))
            }
            
            return sortedProducts
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка загрузки продуктов')
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        filter: '',
        sortKey: 'popularity',
        loading: false,
        error: null,
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setSortKey: (state, action) => {
            state.sortKey = action.payload
        },
        resetProductsError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.products = []
            })
    },
})

export const { setFilter, setSortKey, resetProductsError } = productsSlice.actions

// Selectors
export const selectProducts = (state) => state.products.products
export const selectProductsFilter = (state) => state.products.filter
export const selectProductsSortKey = (state) => state.products.sortKey
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer