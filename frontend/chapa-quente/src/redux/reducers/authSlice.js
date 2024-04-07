import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import authService from "./authService";

const user = localStorage.getItem("user");
const userAdapter = createEntityAdapter();

const initialState = {
    user: user ? user : null,
    role: null,
    status: null
}

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const response = await authService.login(user);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})

// export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
//     try {
//         return await authService.register(user);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.status = null;
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.email;
            state.role = action.payload.role;
            state.status = "success";
            localStorage.setItem("user", action.payload.email);
            localStorage.setItem("role", action.payload.role);
        })
        .addCase(login.rejected, (state, action) => {
            state.user = null;
            state.status = "failed";
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;