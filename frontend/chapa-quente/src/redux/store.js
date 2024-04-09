import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './reducers/carrinhoSlice'
import produtosSlice from './reducers/produtosSlice'
import pedidoSlice from './reducers/pedidoSlice'
import tabelaSlice from './reducers/tabelaSlice'

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        pedido: pedidoSlice,
        tabela: tabelaSlice
    }
})