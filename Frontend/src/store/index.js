import { configureStore } from '@reduxjs/toolkit'

import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'
import productsSlice from './slices/productsSlice'
import usersSlice from './slices/usersSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        products: productsSlice,
        users: usersSlice,
    },
})

export default store