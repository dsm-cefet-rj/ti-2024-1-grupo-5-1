import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './reducers/carrinhoSlice'
import produtosSlice from './reducers/produtosSlice'
import managerSlice from './reducers/managerSlice'

export default configureStore({
    reducer: {
        carrinho: carrinhoReducer,
        produtos: produtosSlice,
        manager: managerSlice
    }
})