import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Stack } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchFromOrder, rate } from '../../redux/reducers/pedidoSlice';
import StarRating from './starRating';

const StatusPedido = ({user}) => {
  const { pedidoId } = useParams();
  const { pedido, status } = useSelector((state) => state.pedido);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFromOrder(pedidoId));
    }
  }, [pedidoId]);

  useEffect(() => {
    if (pedido && user && pedido.user_id !== user._id) {
      toast('Você não tem permissão para acessar este pedido!', { type: 'error' });
      navigate('/pedidos');
    }
  }, [pedido, user]);

  if (!pedido) {
    return <div>Carregando...</div>;
  }

  const handleRatingSubmit = async (newRating) => {
    try {
      console.log(pedidoId, newRating)
      dispatch(rate([pedidoId, newRating]));
      toast('Avaliação enviada com sucesso!', { type: 'success' });
      window.location.reload();
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast('Erro ao enviar avaliação', { type: 'error' });
    }
  };

  return (
    <Stack className='container' gap={1} style={{textAlign: 'center'}}>
        <h2>Status do Pedido: {pedido.status}</h2>
        <h5>ID do Pedido: {pedido._id}</h5>
        <h5>Forma de Pagamento: {pedido.pagamento}</h5>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {pedido.produtos.map((produto) => (
              <tr key={produto._id}>
                <td>{produto._id}</td>
                <td>{produto.nome}</td>
                <td>R$ {produto.price}</td>
                <td>{produto.qtd}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5>Preço Total: {pedido.total} </h5>

        <StarRating totalStars={5} initialRating={pedido.avaliacao} onSubmit={handleRatingSubmit} />
        <Link to="/pedidos/">
          <Button variant="primary">Voltar para Pedidos</Button>
        </Link>
    </Stack>
  );
};

export default StatusPedido;
