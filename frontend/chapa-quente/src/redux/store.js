import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './reducers/carrinhoSlice'
import produtosSlice from './reducers/produtosSlice'

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice
    }
})