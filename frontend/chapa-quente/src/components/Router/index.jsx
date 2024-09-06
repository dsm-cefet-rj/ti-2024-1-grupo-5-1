import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Inicio from '../Inicio';
import Relatorios from '../Relatorios';
import Cadastro from '../Cadastro';
import Produtos from '../Produtos';
import Contato from '../Contato';
import Pedidos from '../Pedidos';
import Logout from '../Logout';
import Conta from '../Conta';
import Login from '../Login';
import Carrinho from '../Carrinho';
import StatusPedido from '../StatusPedido';
import PedidosAtivos from "../PedidosAtivos";
import ProdutoManager from '../ProdutoManager';
import ProdutosForm from "../ProdutoManager/ProdutosForm";

const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};

function ProtectedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
}

const Router = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas abertas */}
                <Route path='/' element={<Inicio isLoggedIn={isLoggedIn} />} />
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} />} />
                <Route path='/conta' element={<Conta isLoggedIn={isLoggedIn} user={user}/>} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/carrinho' element={<Carrinho />} />
                <Route path='/pedidos/' element={<Pedidos />} />
                <Route path='/contato' element={<Contato />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/produtos' element={<Produtos />} />

                {/* Rotas protegidas */}
                <Route 
                    path='/relatorios' 
                    element={
                        <ProtectedRoute>
                            <Relatorios />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/produtosmanager' 
                    element={
                        <ProtectedRoute>
                            <ProdutoManager />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/ativos' 
                    element={
                        <ProtectedRoute>
                            <PedidosAtivos />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/produtosmanager/edit/:id' 
                    element={
                        <ProtectedRoute>
                            <ProdutosForm isEditing={true} />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/produtosmanager/new' 
                    element={
                        <ProtectedRoute>
                            <ProdutosForm isEditing={false} />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/statusPedido/:pedidoId' 
                    element={
                        <ProtectedRoute>
                            <StatusPedido />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
