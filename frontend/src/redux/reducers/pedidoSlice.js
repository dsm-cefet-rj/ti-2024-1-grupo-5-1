import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PedidoService from '../services/pedidoService';

export const register = createAsyncThunk('pedido/register', async (pedido, { rejectWithValue }) => {
  try {
    const response = await PedidoService.register(pedido);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return rejectWithValue({ message });
  }
});

export const fetchFromUser = createAsyncThunk('pedido/fetchFromUser', async (id, { rejectWithValue }) => {
  try {
    const response = await PedidoService.fetchFromUser(id);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return rejectWithValue({ message });
  }
});

export const fetchFromOrder = createAsyncThunk('pedido/fetchFromOrder', async (id, { rejectWithValue }) => {
  try {
    const response = await PedidoService.fetchFromOrder(id);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return rejectWithValue({ message });
  }
});

export const rate = createAsyncThunk('pedido/rate', async ([id, rate], { rejectWithValue }) => {
  try {
    const response = await PedidoService.rate(id, rate);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return rejectWithValue({ message });
  }
});

export const updateStatus = createAsyncThunk('pedido/updateStatus', async ([id, status], { rejectWithValue }) => {
  try {
    const response = await PedidoService.updateStatus(id, status);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return rejectWithValue({ message });
  }
});

const pedidoSlice = createSlice({
  name: 'pedido',
  initialState: {
    pedido: null,
    status: 'idle',
    pedidos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.pedido = action.payload;
        state.status = 'success';
      })
      .addCase(register.rejected, (state, action) => {
        state.pedido = null;
        throw new Error('Erro ao registrar pedido');
      })
      .addCase(fetchFromUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFromUser.fulfilled, (state, action) => {
        state.pedidos = action.payload;
        state.status = 'success';
      })
      .addCase(fetchFromUser.rejected, (state, action) => {
        state.pedido = null;
        throw new Error('Erro ao buscar pedido');
      })
      .addCase(fetchFromOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFromOrder.fulfilled, (state, action) => {
        state.pedido = action.payload;
        state.status = 'success';
      })
      .addCase(fetchFromOrder.rejected, (state, action) => {
        state.pedido = null;
        throw new Error('Erro ao buscar pedido');
      })
  }
});

export default pedidoSlice.reducer;
