import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:5000/api'

// Async thunks для cart API
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${userId}`)
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при загрузке корзины')
            }
            
            return data.cart
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async ({ product_id, user_id, payment_type }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id,
                    user_id,
                    payment_type,
                }),
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при добавлении в корзину')
            }
            
            return data.id
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

export const removeFromCartAsync = createAsyncThunk(
    'cart/removeFromCart',
    async (cartItemId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
                method: 'DELETE',
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при удалении из корзины')
            }
            
            return cartItemId
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        resetCartError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false
                state.cartItems = action.payload || []
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            
            // addToCartAsync
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToCartAsync.fulfilled, (state) => {
                state.loading = false
                // Новый item будет загружен при следующем fetchCart
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            
            // removeFromCartAsync
            .addCase(removeFromCartAsync.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                state.loading = false
                state.cartItems = state.cartItems.filter(
                    item => item.id !== action.payload
                )
            })
            .addCase(removeFromCartAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { clearCart, resetCartError } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.cartItems
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error

export default cartSlice.reducer