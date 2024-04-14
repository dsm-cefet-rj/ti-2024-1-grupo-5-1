import { createSlice } from "@reduxjs/toolkit";

const data = {
    id: 0,
    nome: '',
    price: 0,
    desc: '',
    src: null,
}

const initialState = {
    data,
    status: null
};

export const slice = createSlice({
    name: 'managerProduto',
    initialState,
    reducers: {
        updateFormField(state, action) {
            const { name, value } = action.payload;
            state.data[name] = value;
        },
        resetForm(state) {
            return initialState;
        },
        copyDataFromProduto(state, action) {
            const produtoData = action.payload;
            return {
                ...state,
                data: {
                    ...produtoData
                }
            }
        }
    }
})

export const { updateFormField, resetForm, copyDataFromProduto } = slice.actions
export default slice.reducer