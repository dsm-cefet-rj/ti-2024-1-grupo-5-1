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

export const fetchProduto = createAsyncThunk('produtos/fetchProduto', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:3001/produtos/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue("Produto não existe na base")
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

export const removeProduto = createAsyncThunk('produtos/removeProduto', async (produtoId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:3001/produtos/${produtoId}`);
        return produtoId;
    } catch (error) {
        return rejectWithValue("Produto não existe na base");
    }
})

export const alteraProduto = createAsyncThunk('produtos/alteraProduto', async (produtoData) => {
    try {
        const response = await axios.patch(`http://localhost:3001/produtos/${produtoData.id}`, produtoData);
        return response.data;
    } catch (error) {
        console.error('Error altering produto:', error);
        throw error;
    }
})

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
            state.status = 'succeeded'
            produtosAdapter.addOne(state, actions.payload)
        }).addCase(fetchProduto.pending, (state, actions) => {
            console.log("Produto pendente")
            state.status = 'loading'
        }).addCase(fetchProduto.fulfilled, (state, actions) => {
            console.log("Produto pronto")
            state.status = 'succeeded'
            produtosAdapter.addOne(state, actions.payload);
        }).addCase(fetchProduto.rejected, (state, action) => {
            state.status = 'failed';
            throw action.payload;
        }).addCase(alteraProduto.pending, (state, actions) => {
            console.log("Altera Produto pendente")
            state.status = 'loading'
        }).addCase(alteraProduto.fulfilled, (state, actions) => {
            console.log("Altera Produto pronto")
            state.status = 'succeeded'
            produtosAdapter.upsertOne(state, actions.payload);
        }).addCase(removeProduto.pending, (state, actions) => {
            console.log("Removendo produto")
            state.status = 'loading'
        }).addCase(removeProduto.fulfilled, (state, actions) => {
            console.log("Produto removido")
            state.status = 'succeeded'
            produtosAdapter.removeOne(state, actions.payload)
        }).addCase(removeProduto.rejected, (state, action) => {
            console.log("Erro ao remover produto:", action.payload);
            state.status = 'failed';
            throw action.payload;
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