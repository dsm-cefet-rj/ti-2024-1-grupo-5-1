import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import AuthService from '../services/authService';

const userAdapter = createEntityAdapter();
const user = localStorage.getItem("user");

const initialState = userAdapter.getInitialState({
    isLoggedIn: user ? true : false,
    user: user ? JSON.parse(user) : null,
    status: null,
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
        .addCase(register.pending, (state) => {
            console.log('Cadastrando usuário...');
            state.status = 'loading';
        })
        .addCase(register.fulfilled, (state) => {
            console.log('Usuário cadastrado.');
            state.isLoggedIn = false;
            state.status = 'success';
            state.user = null;
        })
        .addCase(register.rejected, (state) => {
            console.log('Falha no cadastro.');
            state.isLoggedIn = false;
            state.status = 'failed';
            state.user = null;
        })
        .addCase(login.pending, (state) => {
            console.log('Autenticando...');
            state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('Usuário logado.');
            state.isLoggedIn = true;
            state.status = 'success';
            state.user = action.payload;
        })
        .addCase(login.rejected, (state) => {
            console.log('Erro nas credenciais.');
            state.status = 'failed';
            state.isLoggedIn = false;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            console.log('Usuário deslogado.');
            state.isLoggedIn = false;
            state.user = null;
        })
        .addCase(update.pending, (state) => {
            console.log('Atualizando dados...');
            state.status = 'loading';
        })
        .addCase(update.fulfilled, (state, action) => {
            console.log('Usuário atualizado.');
            state.status = 'success';
            state.user = action.payload;
        })
        .addCase(update.rejected, (state) => {
            console.log('Falha ao atualizar dados.');
            state.status = 'failed';
        })
    },
});

export default authSlice.reducer;