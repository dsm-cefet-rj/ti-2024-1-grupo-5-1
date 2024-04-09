import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'carrinho',
    initialState: {
        itens: []
    },
    reducers: {
        addItem: (state, action) => {
            const { id } = action.payload;
            const itemExistente = state.itens.find(item => item.id === id);
            if (itemExistente) {
                itemExistente.quantity += 1;
            } else {
                state.itens.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            const index = state.itens.findIndex(item => item.id === id);
            if (index !== -1) {
                if (state.itens[index].quantity > 1) {
                    state.itens[index].quantity -= 1;
                } else {
                    state.itens.splice(index, 1);
                }
            }
           
        }
    }
});

export const { addItem, removeItem } = slice.actions;
export default slice.reducer;
