import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProdutos = createAsyncThunk('produtos/fetchProdutos', async () => {
    try {
        const response = await axios.get('http://localhost:3001/produtos');
        return response.data;
    } catch (error) {
        console.error('Error fetching produtos:', error);
        throw error;
    }
})

export const addProduto = createAsyncThunk('produtos/addProduto', async (produtoData) => {
    try {
        const response = await axios.post('http://localhost:3001/produtos', produtoData);
        return response.data;
    } catch (error) {
        console.error('Error adding produto:', error);
        throw error;
    }
});

const produtosAdapter = createEntityAdapter();

export const slice = createSlice({
    name: 'produtos',
    initialState: produtosAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProdutos.pending, (state, actions) => {
            console.log("Produtos pendente")
            state.status = 'loading'
        }).addCase(fetchProdutos.fulfilled, (state, actions) => {
            console.log("Produtos carregados")
            state.status = 'succeeded'
            produtosAdapter.setAll(state, actions.payload)
        }).addCase(addProduto.fulfilled, (state, actions) => {
            console.log("Adicionando produto")
            state.status = 'changed'
            produtosAdapter.addOne(state, actions.payload)
        })
    }
})

export const { } = slice.actions
export default slice.reducer

export const {
    selectAll: selectAllProdutos,
    selectById: selectProduto,
} = produtosAdapter.getSelectors(state => state.produtos)

//'idle' | 'loading' | 'succeeded' | 'failed' | 'changed' 