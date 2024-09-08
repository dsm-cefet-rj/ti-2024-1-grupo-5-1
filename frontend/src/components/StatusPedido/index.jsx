import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Stack } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchFromOrder, rate } from '../../redux/reducers/pedidoSlice';
import StarRating from './starRating';

const StatusPedido = ({ user }) => {
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
    if (pedido && user && pedido.user_id !== user.id && user.role !== 'admin') {
      toast('Você não tem permissão para acessar este pedido!', { type: 'error' });
      navigate('/pedidos');
    }
  }, [pedido, user]);

  if (!pedido) {
    return (
      <>
          <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '55px' }}>
          <h5 className="text-center mb-2">Carregando seu pedido, por favor aguarde...</h5>
          </div>
      </>
  )
  }

  const handleRatingSubmit = async (newRating) => {
    try {
      console.log(pedidoId, newRating)
      dispatch(rate([pedidoId, newRating]));
      toast('Avaliação enviada com sucesso!', { type: 'success' });
      setTimeout(() => {
        window.location.reload();
      }, 1400)
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      toast('Erro ao enviar avaliação', { type: 'error' });
    }
  };

  return (
    <Stack className='container' gap={2} style={{ marginTop: '30px', textAlign: 'center', maxWidth: '40vw' }}>
      <div>
        <h3>Pedido {pedido._id}</h3>
        <h5>Status do Pedido: {pedido.status}</h5>
        <h5>Forma de Pagamento: {pedido.pagamento}</h5>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {pedido.produtos.map((produto) => (
              <tr key={produto._id}>
                <td>{produto._id}</td>
                <td>{produto.nome}</td>
                <td>{produto.qtd}</td>
                <td>R$ {(produto.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>Descrição: {pedido.descricao ? pedido.descricao : 'Sem descrição'}</p>
        <p>Total: R$ {(pedido.total).toFixed(2)} </p>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <StarRating totalStars={5} initialRating={pedido.avaliacao} onSubmit={handleRatingSubmit} />
        <Button as={Link} to={`/pedidos/`} variant="primary">Voltar para Pedidos</Button>
      </div>
    </Stack>
  );
};

export default StatusPedido;