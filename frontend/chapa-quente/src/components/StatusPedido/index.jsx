import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Alert, Button } from 'react-bootstrap';
import StarRating from './starRating';
import { Link } from 'react-router-dom';

const StatusPedido = () => {
  const { pedidoId } = useParams(); // Obtém o ID do pedido da URL
  const [pedido, setPedido] = useState(null);
  const [avaliacao, setAvaliacao] = useState(0);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/pedidos/${pedidoId}`);
        const fetchedPedido = response.data;
        setPedido(fetchedPedido); // Define o pedido
        setAvaliacao(fetchedPedido.avaliacao || 0); // Avaliação inicial
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        setMensagem('Erro ao carregar pedido');
      }
    };

    fetchPedido(); // Busca o pedido quando o componente monta ou pedidoId muda
  }, [pedidoId]);


  if (!pedido) {
    return <div>Carregando...</div>; // Exibe enquanto os dados são buscados
  }

  const handleRatingChange = (newRating) => {
    setAvaliacao(newRating);

    axios
      .patch(`http://localhost:3001/pedidos/${pedido.id}`, { avaliacao: newRating })
      .then(() => {
        setMensagem('Avaliação enviada com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao enviar avaliação:', error);
        setMensagem('Erro ao enviar avaliação.');
      });
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Status do Pedido: {pedido.status}</h2>
      <h5>ID do Pedido: {pedido.id}</h5>
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
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.name}</td>
              <td>R$ {produto.price}</td>
              <td>{produto.qtd}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5>Preço Total: {pedido.total} </h5>

      <div>
        <h4>Avaliação do Pedido:</h4>
        <StarRating totalStars={5} initialRating={avaliacao} onRatingChange={handleRatingChange} />
      </div>

      <Link to="/pedidos/:usersid">
        <Button variant="primary">Voltar para Pedidos</Button>
      </Link>

      {mensagem && (
        <Alert variant={mensagem.includes('sucesso') ? 'success' : 'danger'}>
          {mensagem}
        </Alert>
      )}
    </div>
  );
};

export default StatusPedido;
