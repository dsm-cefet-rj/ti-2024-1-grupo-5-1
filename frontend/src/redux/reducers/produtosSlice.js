import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import ProductService from '../services/productService';

export const fetchProdutos = createAsyncThunk('produtos/fetchProdutos', async (_, { rejectWithValue }) => {
    try {
        return await ProductService.fetchProdutos();
    } catch (error) {
        console.error('Error fetching produtos:', error);
        return rejectWithValue(error.message);
    }
});

export const fetchProduto = createAsyncThunk('produtos/fetchProduto', async (id, { rejectWithValue }) => {
    try {
        return await ProductService.fetchProduto(id);
    } catch (error) {
        return rejectWithValue("Produto não existe na base");
    }
});

export const addProduto = createAsyncThunk('produtos/addProduto', async (produtoData, { rejectWithValue }) => {
    try {
        return await ProductService.addProduto(produtoData);
    } catch (error) {
        console.error('Error adding produto:', error);
        return rejectWithValue(error.message);
    }
});

export const alteraProduto = createAsyncThunk('produtos/alteraProduto', async ({ produtoId, produtoData }, { rejectWithValue }) => {
    try {
        return await ProductService.alteraProduto(produtoId, produtoData);
    } catch (error) {
        console.error('Error altering produto:', error);
        return rejectWithValue(error.message);
    }
});

export const removeProduto = createAsyncThunk('produtos/removeProduto', async (produtoId, { rejectWithValue }) => {
    try {
        await ProductService.removeProduto(produtoId);
        return produtoId;
    } catch (error) {
        return rejectWithValue("Produto não existe na base");
    }
});

const produtosAdapter = createEntityAdapter({
    selectId: (produto) => produto._id,
});

export const slice = createSlice({
    name: 'produtos',
    initialState: produtosAdapter.getInitialState({
        status: 'idle',
        error: null,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProdutos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProdutos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                produtosAdapter.setAll(state, action.payload);
            })
            .addCase(addProduto.fulfilled, (state, action) => {
                state.status = 'succeeded';
                produtosAdapter.addOne(state, action.payload);
            })
            .addCase(fetchProduto.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduto.fulfilled, (state, action) => {
                state.status = 'succeeded';
                produtosAdapter.addOne(state, action.payload);
            })
            .addCase(alteraProduto.fulfilled, (state, action) => {
                produtosAdapter.upsertOne(state, action.payload);
            })
            .addCase(removeProduto.fulfilled, (state, action) => {
                produtosAdapter.removeOne(state, action.payload);
            })
            .addCase(removeProduto.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default slice.reducer;

export const {
    selectAll: selectAllProdutos,
    selectById: selectProduto,
} = produtosAdapter.getSelectors(state => state.produtos);
