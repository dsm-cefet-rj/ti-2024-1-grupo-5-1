import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './reducers/carrinhoSlice'
import produtosSlice from './reducers/produtosSlice'
import authSlice from './reducers/authSlice'

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        auth: authSlice
    }
})