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

export const fetchAvaliacoes = createAsyncThunk('reports/fetchAvaliacoes', async (_, { rejectWithValue }) => {
    try {
        const response = await ReportService.fetchAvaliacoes();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAgendamentos = createAsyncThunk('reports/fetchAgendamentos', async (_, { rejectWithValue }) => {
    try {
        const response = await ReportService.fetchAgendamentos();
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
    },
    avaliacoes: {
        data: [],
        status: 'idle',
        fetched: false,
    },
    agendamentos:{
        data: [],
        status: 'idle',
        fetched: false,
    },
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPedidos.pending, (state) => {
                state.pedidos.status = 'loading';
            })
            .addCase(fetchPedidos.fulfilled, (state, action) => {
                state.pedidos.status = 'success';
                state.pedidos.data = action.payload;
                state.pedidos.fetched = true;
            })
            .addCase(fetchPedidos.rejected, (state) => {
                state.pedidos.status = 'failed';
            })
            .addCase(fetchAvaliacoes.pending, (state) => {
                state.avaliacoes.status = 'loading';
            })
            .addCase(fetchAvaliacoes.fulfilled, (state, action) => {
                state.avaliacoes.status = 'success';
                state.avaliacoes.data = action.payload;
                state.avaliacoes.fetched = true;
            })
            .addCase(fetchAvaliacoes.rejected, (state) => {
                state.avaliacoes.data = null;
                throw new Error("Erro ao buscar avaliações");
            })
            .addCase(fetchAgendamentos.pending, (state) => {
                state.agendamentos.status = 'loading';
            })
            .addCase(fetchAgendamentos.fulfilled, (state, action) => {
                state.agendamentos.status = 'success';
                state.agendamentos.data = action.payload;
                state.agendamentos.fetched = true;
            })
            .addCase(fetchAgendamentos.rejected, (state) => {
                state.agendamentos.status = 'failed';
            });
    }
});

export default reportsSlice.reducer;