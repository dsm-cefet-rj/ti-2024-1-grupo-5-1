
import { createSlice } from '@reduxjs/toolkit';

const tabelaSlice = createSlice({
    name: 'tabela',
    initialState: {
      produtos: [], 
    },
    reducers: {
      setProdutos: (state, action) => {
        state.produtos = action.payload;
      },
      adicionarProduto: (state, action) => {
        const { id, nome, quantidade, precoUnitario, total } = action.payload;
        state.produtos.push({ id, nome, quantidade, precoUnitario, total });
      },
      removerProduto: (state, action) => {
        const { id } = action.payload;
      if (state.quantidades[id].quantity > 1) {
        state.quantidades[id].quantity -= 1;
      } else {
        delete state.quantidades[id];
      }
    },
    },
  });
export const { setProdutos, adicionarProduto, removerProduto } = tabelaSlice.actions;
export default tabelaSlice.reducer;
