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

export const fetch = createAsyncThunk('pedido/fetch', async (id, { rejectWithValue }) => {
  try {
      const response = await PedidoService.fetch(id);
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
      .addCase(fetch.fulfilled, (state, action) => {
        state.pedido = action.payload;
        state.status = 'success';
      })
      .addCase(fetch.rejected, (state, action) => {
        state.pedido = null;
        throw new Error('Erro ao buscar pedido');
      });
  }
}); 

export default pedidoSlice.reducer;
