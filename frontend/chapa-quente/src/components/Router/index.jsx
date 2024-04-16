import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Produtos from '../Produtos'
import Pedidos from '../Pedido'
import ProdutoManager from '../ProdutoManager'
import ProdutosForm from "../ProdutoManager/ProdutosForm";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Adicione aqui as rotas Ex: <Route path='produtos' element={<Produtos/>} />*/}
                    <Route path='/produtos' element={<Produtos/>} />
                    <Route path='/pedidos' element={<Pedidos/>} />
                    <Route path='/produtosmanager' element={<ProdutoManager/>}/>
                    <Route path='/produtosmanager/edit/:id' element={<ProdutosForm isEditing={true}/>}/>
                    <Route path='/produtosmanager/new' element={<ProdutosForm isEditing={false}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;