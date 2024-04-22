// pedidoSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'pedido',
  initialState: {
    pedidos: [],
    exibirCaixaDeTexto: false,
    quantidadeTroco: '',
    quantidades: {}
  },
  reducers: {
    toggleCaixaTexto: (state) => {
      state.exibirCaixaDeTexto = !state.exibirCaixaDeTexto;
    },
    setQuantidadeTroco: (state, action) => {
      state.quantidadeTroco = action.payload;
    },
  
  }
});

export const {toggleCaixaTexto, setQuantidadeTroco} = slice.actions;
export default slice.reducer;
