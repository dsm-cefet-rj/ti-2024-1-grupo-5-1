import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from '../Inicio'

import Relatorios from '../Relatorios'
import Cadastro from '../Cadastro'
import Produtos from '../Produtos'
import Pedidos from '../Pedido'
import Logout from '../Logout'
import Conta from '../Conta'
import Login from '../Login'
const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Adicione aqui as rotas Ex: <Route path='produtos' element={<Produtos/>} />*/}
                    <Route path='/' element={<Inicio/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/conta' element={<Conta/>} />
                    <Route path='/logout' element={<Logout/>} />
                    <Route path='/pedidos' element={<Pedidos/>} />
                    <Route path='/cadastro' element={<Cadastro/>} />
                    <Route path='/produtos' element={<Produtos/>} />,
                    <Route path='/relatorios' element={<Relatorios/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;