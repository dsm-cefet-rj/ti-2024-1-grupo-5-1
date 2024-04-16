import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchProdutos = createAsyncThunk('produtos/fetchProdutos',
    async () => {
        const response = await axios.get('http://localhost:3001/produtos');
        return response.data;
    })

export const slice = createSlice({
    name: 'produtos',
    initialState: {
        itens: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProdutos.pending, (state, actions) => {
            console.log("Produtos pendente")
        }).addCase(fetchProdutos.fulfilled, (state, actions) => {
            state.itens = actions.payload
        })
    }
})

export const { } = slice.actions
export default slice.reducer