import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'carrinho',
    initialState: {
        itens: []
    },
    reducers: {
        addItem: (state, action) => {
            state.itens = [...state.itens, action.payload]
        },
        removeItem: (state, action) => {
            if (state.itens.length > 0) {
                var newCarrinho = state.itens
                const indexs = state.itens.map((itemCarrinho) => itemCarrinho.id)
                const indexToRemove = indexs.lastIndexOf(action.payload.id)
                newCarrinho.splice(indexToRemove, 1)
                state.itens = newCarrinho
            }
        },
        clearCart: (state) => {
            state.itens = []
        }
    }
})

export const { addItem, removeItem, clearCart } = slice.actions
export default slice.reducer