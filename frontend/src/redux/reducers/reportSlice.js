import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ReportService from '../services/reportService';

export const fetchPedidos = createAsyncThunk('reports/fetchPedidos', async (_, { rejectWithValue }) => {
    try {
        const response = await ReportService.fetchPedidos();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    pedidos: {
        data: [],
        status: 'idle',
        fetched: false,
    }
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPedidos.pending, (state) => {
                state.pedidos.status = 'loading';
                state.pedidos.fetched = false;
            })
            .addCase(fetchPedidos.fulfilled, (state, action) => {
                state.pedidos.status = 'success';
                state.pedidos.fetched = true;
                state.pedidos.data = action.payload;
            })
            .addCase(fetchPedidos.rejected, (state) => {
                state.pedidos.status = 'failed';
                state.pedidos.fetched = false;
                state.pedidos.data = null;
            })
    }
});

export default reportsSlice.reducer;
