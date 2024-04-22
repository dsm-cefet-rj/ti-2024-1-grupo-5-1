import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetch } from '../../redux/reducers/pedidoSlice';

const Pedidos = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { pedido, status } = useSelector((state) => state.pedido);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      toast('Você precisa estar logado para poder fazer isso!', { type: 'error' });
    } else {
      dispatch(fetch(user.id));
    }
  }, [user, isLoggedIn, navigate, dispatch]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Pedidos do Usuário {user.nome}</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && (
            <tr>
              <td colSpan="3">Carregando...</td>
            </tr>
          )}
          {status === 'success' && pedido.length > 0 ? (
            pedido.map((pedidos) => (
              <tr key={pedidos.id}>
                <td>{pedidos.id}</td>
                <td>{pedidos.status}</td>
                <td>
                  <Link to={`/statusPedido/${pedidos.id}`}>
                    <Button variant="primary">Ver Detalhes</Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum pedido encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Pedidos;
