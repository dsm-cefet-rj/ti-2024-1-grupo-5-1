import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import AuthService from '../services/authService';

const userAdapter = createEntityAdapter();
const user = localStorage.getItem("user");

const initialState = userAdapter.getInitialState({
    isLoggedIn: user ? true : false,
    user: user ? JSON.parse(user) : null
});

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
    try {
        const response = await AuthService.register(user);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const login = createAsyncThunk('auth/login', async ({ email, senha }, { rejectWithValue }) => {
    try {
        const response = await AuthService.login(email, senha);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const update = createAsyncThunk('auth/update', async (user, { rejectWithValue }) => {
    try {
        const response = await AuthService.update(user);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return rejectWithValue({ message });
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    AuthService.logout();
});

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
            state.user = action.payload;
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
            state.user = action.payload;
        })
        .addCase(update.rejected, (state) => {
            state.isLoggedIn = true;
            state.user = null;
            throw new Error();
        })
    },
});

export default authSlice.reducer;