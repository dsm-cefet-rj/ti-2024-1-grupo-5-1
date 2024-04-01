import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Produtos from '../Produtos'
import Pedidos from '../Pedido'
import TabelaPedidos from '../Pedido';

const Router = () => {
    const [carrinho, setCarrinho] = useState([])
    const [quantity, setQuantity] = useState(0)

    function handleAddCarrinho(item){
        setCarrinho([...carrinho, item])
        setQuantity(quantity+1)
    }

    function handleRemoveCarrinho(item) {
        if (carrinho.length > 0){
            var newCarrinho = carrinho
            const indexs = carrinho.map((itemCarrinho) => itemCarrinho.id)
            const indexToRemove = indexs.lastIndexOf(item.id)
            newCarrinho.splice(indexToRemove, 1)
            setCarrinho(newCarrinho)
            setQuantity(quantity-1)
        }
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Adicione aqui as rotas Ex: <Route path='produtos' element={<Produtos/>} />*/}
                    <Route path='/produtos' element={
                        <Produtos quantity={quantity} handleAddCarrinho = {handleAddCarrinho} handleRemoveCarrinho = {handleRemoveCarrinho}/>} />
                    <Route path='/pedidos' element={<TabelaPedidos pedidos={carrinho} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;