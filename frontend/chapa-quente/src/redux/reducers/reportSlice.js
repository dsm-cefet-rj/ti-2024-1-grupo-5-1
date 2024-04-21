import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ReportService from '../services/reportService';

export const fetchClientesFidelizados = createAsyncThunk( 'reports/fetchClientesFidelizados', async (_, { rejectWithValue }) => {
    try {
        const response = await ReportService.fetchClientesFidelizados();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchVendasPorTempo = createAsyncThunk('reports/fetchVendasPorTempo', async (_, { rejectWithValue }) => {
    try {
        const response = await ReportService.fetchVendasPorTempo();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchProdutosMaisVendidos = createAsyncThunk('reports/fetchProdutosMaisVendidos', async (_, { rejectWithValue }) => {
    try {
        const response = await ReportService.fetchProdutosMaisVendidos();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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
    clientesFidelizados: {
        data: [],
        status: 'idle',
        fetched: false,
    },
    vendasPorTempo: {
        data: [],
        status: 'idle',
        fetched: false,
    },
    produtosMaisVendidos: {
        data: [],
        status: 'idle',
        fetched: false,
    },
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
            .addCase(fetchClientesFidelizados.pending, (state) => {
                state.clientesFidelizados.status = 'loading';
            })
            .addCase(fetchClientesFidelizados.fulfilled, (state, action) => {
                state.clientesFidelizados.status = 'success';
                state.clientesFidelizados.data = action.payload;
                state.clientesFidelizados.fetched = true;
            })
            .addCase(fetchClientesFidelizados.rejected, (state) => {
                state.clientesFidelizados.status = 'failed';
            })
            .addCase(fetchVendasPorTempo.pending, (state) => {
                state.vendasPorTempo.status = 'loading';
            })
            .addCase(fetchVendasPorTempo.fulfilled, (state, action) => {
                state.vendasPorTempo.status = 'success';
                state.vendasPorTempo.data = action.payload;
                state.vendasPorTempo.fetched = true;
            })
            .addCase(fetchVendasPorTempo.rejected, (state) => {
                state.vendasPorTempo.status = 'failed';
            })
            .addCase(fetchProdutosMaisVendidos.pending, (state) => {
                state.produtosMaisVendidos.status = 'loading';
            })
            .addCase(fetchProdutosMaisVendidos.fulfilled, (state, action) => {
                state.produtosMaisVendidos.status = 'success';
                state.produtosMaisVendidos.data = action.payload;
                state.produtosMaisVendidos.fetched = true;
            })
            .addCase(fetchProdutosMaisVendidos.rejected, (state) => {
                state.produtosMaisVendidos.status = 'failed';
            })
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
                state.avaliacoes.status = 'failed';
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
