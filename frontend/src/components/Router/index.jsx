import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import AcessoNegado from '../AcessoNegado';
import NotFound from '../NotFound';

const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};

function AuthenticatedRoute({ children }) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
}

const isStaff = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        return user.role === 'admin';
    } else {
        return false;
    }
}

function StaffRoute({ children }) {
    if (!isStaff()) {
        return <Navigate to="/acesso-negado" />;
    }
    return children;
}

const Router = ({user, isLoggedIn}) => {

    return (
        <BrowserRouter>
            <Routes>

                {/* Rotas abertas */}

                <Route path='/' element={<Inicio isLoggedIn={isLoggedIn} />} />
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} />} />
                <Route path='/cadastro' element={<Cadastro isLoggedIn={isLoggedIn} />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/produtos' element={<Produtos isLoggedIn={isLoggedIn} />} />
                
                <Route path='/contato' element={<Contato />} />
                <Route path='/acesso-negado' element={<AcessoNegado />} />
                <Route path='*' element={<NotFound />} />

                {/* Rotas protegidas por autenticação */}

                <Route
                    path='/conta'
                    element={
                        <AuthenticatedRoute>
                            <Conta user={user} />
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/pedidos/'
                    element={
                        <AuthenticatedRoute>
                            <Pedidos user={user}/>
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/carrinho'
                    element={
                        <AuthenticatedRoute>
                            <Carrinho />
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/statusPedido/:pedidoId'
                    element={
                        <AuthenticatedRoute>
                            <StatusPedido user={user}/>
                        </AuthenticatedRoute>
                    }
                />

                {/* Rotas protegidas por autenticação e cargo (funcionários)*/}

                <Route
                    path='/ativos'
                    element={
                        <AuthenticatedRoute>
                            <StaffRoute>
                                <PedidosAtivos />
                            </StaffRoute>
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/relatorios'
                    element={
                        <AuthenticatedRoute>
                            <StaffRoute>
                                <Relatorios />
                            </StaffRoute>
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/produtosmanager'
                    element={
                        <AuthenticatedRoute>
                            <StaffRoute>
                                <ProdutoManager />
                            </StaffRoute>
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/produtosmanager/edit/:id'
                    element={
                        <AuthenticatedRoute>
                            <StaffRoute>
                                <ProdutosForm isEditing={true} />
                            </StaffRoute>
                        </AuthenticatedRoute>
                    }
                />

                <Route
                    path='/produtosmanager/new'
                    element={
                        <AuthenticatedRoute>
                            <StaffRoute>
                                <ProdutosForm isEditing={false} />
                            </StaffRoute>
                        </AuthenticatedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default Router;
