import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:5000/api'

// Async thunk для авторизации
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при авторизации')
            }
            
            return data.user
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

// Async thunk для получения пользователя по ID
export const fetchUserById = createAsyncThunk(
    'auth/fetchUserById',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`)
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Пользователь не найден')
            }
            
            return data.user
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.error = null
        },
        resetAuthError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload
            })
            
            // fetchUserById
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = !!action.payload
                state.error = null
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false
                state.user = null
                state.isAuthenticated = false
                state.error = action.payload
            })
    },
})

export const { logout, resetAuthError } = authSlice.actions

// Selectors
export const selectUser = (state) => state.auth.user
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated

export default authSlice.reducer