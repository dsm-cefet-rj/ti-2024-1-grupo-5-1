import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Produtos from '../Produtos'
import Pedidos from '../Pedido'
import Agendamento from '../Agendamento'
import StatusPedido from "../StatusPedido";

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Adicione aqui as rotas Ex: <Route path='produtos' element={<Produtos/>} />*/}
                    <Route path='/agendamento' element={<Agendamento/>} />
                    <Route path='/produtos' element={<Produtos/>} />
                    <Route path='/pedidos' element={<Pedidos/>} />
                     <Route path='/statusPedido'  element={<StatusPedido/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;