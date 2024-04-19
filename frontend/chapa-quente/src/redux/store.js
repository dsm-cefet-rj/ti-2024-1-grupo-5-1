import carrinhoReducer from './reducers/carrinhoSlice';
import produtosSlice from './reducers/produtosSlice';
import reportSlice from './reducers/reportSlice';
import authSlice from './reducers/authSlice';

import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        reports: reportSlice,
        auth: authSlice
    }
})