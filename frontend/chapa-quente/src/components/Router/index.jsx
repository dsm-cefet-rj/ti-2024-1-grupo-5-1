import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Produtos from '../Produtos'
import Pedidos from '../Pedido'
import ProdutosManager from '../ProdutosManager'

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Adicione aqui as rotas Ex: <Route path='produtos' element={<Produtos/>} />*/}
                    <Route path='/produtos' element={<Produtos/>} />
                    <Route path='/produtosform' element={<ProdutosManager/>} />
                    <Route path='/pedidos' element={<Pedidos/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;