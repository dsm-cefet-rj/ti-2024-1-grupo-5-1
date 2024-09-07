import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'carrinho',
    initialState: {
        itens: []
    },
    reducers: {
        addItem(state, action) {
            console.log('Adicionando item ao carrinho.')
            const existingItem = state.itens.findIndex(item => item._id === action.payload._id);
            if (existingItem >= 0) {
                state.itens[existingItem].quantity++;
            } else {
                state.itens.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem(state, action) {
            console.log('Removendo item do carrinho.');
            const existingItem = state.itens.findIndex(item => item._id === action.payload._id);
            if (existingItem >= 0) {
                if (state.itens[existingItem].quantity === 1) {
                    state.itens = state.itens.filter(item => item._id !== action.payload._id);
                } else {
                    state.itens[existingItem].quantity--;
                }
            }
        },
        clearCart(state) {
            console.log('Carrinho esvaziado.')
            state.itens = [];
        }
    }
});

export const { addItem, removeItem, clearCart } = slice.actions
export default slice.reducer