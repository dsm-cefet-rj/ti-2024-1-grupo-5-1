import carrinhoReducer from './reducers/carrinhoSlice';
import produtosSlice from './reducers/produtosSlice';
import reportSlice from './reducers/reportSlice';
import authSlice from './reducers/authSlice';

import { configureStore } from '@reduxjs/toolkit';
import managerSlice from './reducers/managerSlice'
import pedidoSlice from './reducers/pedidoSlice'
import tabelaSlice from './reducers/tabelaSlice'

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        pedido: pedidoSlice,
        tabela: tabelaSlice,
        reports: reportSlice,
        auth: authSlice,
        manager: managerSlice
    }
})