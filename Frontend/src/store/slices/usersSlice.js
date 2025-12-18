import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:5000/api'

// Async thunks для users API
export const registerUser = createAsyncThunk(
    'users/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при регистрации')
            }
            
            return data.user
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при обновлении профиля')
            }
            
            return data.user
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`)
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при загрузке пользователей')
            }
            
            return data.users
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || 'Ошибка при удалении пользователя')
            }
            
            return userId
        } catch (err) {
            return rejectWithValue(err.message || 'Ошибка сети')
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        resetUsersError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        // registerUser
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        
        // updateUser
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        
        // getAllUsers
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAllUsers.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        
        // deleteUser
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { resetUsersError } = usersSlice.actions

// Selectors
export const selectUsersLoading = (state) => state.users.loading
export const selectUsersError = (state) => state.users.error

export default usersSlice.reducer