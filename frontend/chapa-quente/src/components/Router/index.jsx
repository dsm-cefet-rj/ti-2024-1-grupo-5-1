import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from '../Inicio'

import Agendamentos from "../Agendamentos";
import Relatorios from '../Relatorios'
import Cadastro from '../Cadastro'
import Produtos from '../Produtos'
import Contato from '../Contato'
import Pedidos from '../Pedidos'
import Logout from '../Logout'
import Conta from '../Conta'
import Login from '../Login'
import Carrinho from '../Carrinho'
import StatusPedido from '../StatusPedido'

import ProdutoManager from '../ProdutoManager'
import ProdutosForm from "../ProdutoManager/ProdutosForm";

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
                    <Route path='/carrinho' element={<Carrinho/>} />
                    <Route path='/pedidos/' element={<Pedidos/>} />
                    <Route path='/contato' element={<Contato/>} />
                    <Route path='/cadastro' element={<Cadastro/>} />
                    <Route path='/produtos' element={<Produtos/>} />
                    <Route path='/relatorios' element={<Relatorios/>} />
                    <Route path='/agendamentos' element={<Agendamentos/>}/>
                    <Route path='/agendamentos' element={<Agendamentos/>}/>
                    <Route path='/produtosmanager' element={<ProdutoManager/>}/>
                    <Route path='/produtosmanager/edit/:id' element={<ProdutosForm isEditing={true}/>}/>
                    <Route path='/produtosmanager/new' element={<ProdutosForm isEditing={false}/>}/>
                    <Route path='/statusPedido/:pedidoId'  element={<StatusPedido/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router;