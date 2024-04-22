import carrinhoReducer from './reducers/carrinhoSlice';
import produtosSlice from './reducers/produtosSlice';
import reportSlice from './reducers/reportSlice';
import authSlice from './reducers/authSlice';

import managerSlice from './reducers/managerSlice'
import pedidoSlice from './reducers/pedidoSlice'

import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        manager: managerSlice,
        reports: reportSlice,
        pedido: pedidoSlice,
        auth: authSlice
    }
})