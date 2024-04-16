import carrinhoReducer from './reducers/carrinhoSlice';
import produtosSlice from './reducers/produtosSlice';
import authSlice from './reducers/authSlice';

import { configureStore } from '@reduxjs/toolkit';
import managerSlice from './reducers/managerSlice'

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        auth: authSlice,
        manager: managerSlice
    }
})