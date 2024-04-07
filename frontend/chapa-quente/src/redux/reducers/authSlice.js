import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import AuthService from '../services/authService';

const userAdapter = createEntityAdapter();
const user = localStorage.getItem("user");

const initialState = userAdapter.getInitialState({
    isLoggedIn: user ? true : false,
    user: user ? JSON.parse(user) : null,
    status: null,
});

export const register = createAsyncThunk('auth/register', async ({ email, password }) => {
        try {
            const response = await AuthService.register(email, password);
            return response.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
        try {
            const response = await AuthService.login(email, password);
            return { user: response.data };
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
         await AuthService.logout();
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        (builder)
        .addCase(register.fulfilled, (state) => {
            console.log('Registered.');
            state.isLoggedIn = false;
            state.status = 'success';
            state.user = null;
        })
        .addCase(register.rejected, (state) => {
            console.log('Registration failed.');
            state.isLoggedIn = false;
            state.status = 'failed';
            state.user = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('Logged in.');
            console.log(action);
            state.isLoggedIn = true;
            state.status = 'success';
            state.user = action.payload.email;
        })
        .addCase(login.rejected, (state) => {
            console.log('Wrong credentials.');
            state.status = 'failed';
            state.isLoggedIn = false;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
            console.log('Logged out.');
            state.isLoggedIn = false;
            state.user = null;
        })
    },
});

export default authSlice.reducer;