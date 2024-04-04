import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Cadastro from '../Cadastro'
import Login from '../Login'
import Produtos from '../Produtos'
import Pedidos from '../Pedido'

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Adicione aqui as rotas Ex: <Route path='produtos' element={<Produtos/>} />*/}
                    <Route path='/cadastro' element={<Cadastro/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/produtos' element={<Produtos/>} />
                    <Route path='/pedidos' element={<Pedidos/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;