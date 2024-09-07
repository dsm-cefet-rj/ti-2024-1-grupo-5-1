import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import AuthService from '../services/authService';

const userAdapter = createEntityAdapter();
const user = sessionStorage.getItem("user");

const initialState = userAdapter.getInitialState({
    isLoggedIn: user ? true : false,
    user: user ? JSON.parse(user) : null,
    token: null
});

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
    try {
        return await AuthService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
    try {
        return await AuthService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const update = createAsyncThunk('auth/update', async (user, { rejectWithValue }) => {
    try {
        return await AuthService.update(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    AuthService.logout();
});

export const fetchOne = createAsyncThunk('auth/fetchOne', user, async ({ rejectWithValue }) => {
    try {
        return await AuthService.fetchOne(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const fetchMany = createAsyncThunk('auth/fetchMany', async (_, { rejectWithValue }) => {
    try {
        return await AuthService.fetchMany();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const remove = createAsyncThunk('auth/remove', async (userId, { rejectWithValue }) => {
    try {
        return await AuthService.remove(userId);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const selectCurrentUser = (state) => state.auth.user;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        (builder)
            .addCase(register.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(register.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                throw new Error("Cadastro inválido.");
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                throw new Error("Usuário ou senha inválidos.");
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(update.rejected, (state) => {
                state.isLoggedIn = true;
                state.user = null;
                throw new Error('Dados inválidos.');
            })
    },
});

export default authSlice.reducer;