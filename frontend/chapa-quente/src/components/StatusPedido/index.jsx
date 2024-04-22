import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Table, Button, Alert} from 'react-bootstrap';
import StarRating from './starRating';
import axios from 'axios';



const StatusPedido = () => {

    const [pedidoId, setPedidoId] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [pedidoPriceTotal, setPedidoPriceTotal] = useState(null);
    const [pedidoFormaPagamento, setPedidoFormaPagamento] = useState(null);
    const [pedidoSituacaoPedido, setPedidoSituacaoPedido] = useState(null);
    const [avaliacao, setAvaliacao] = useState(0);
    const [mensagem, setMensagem] = useState('');

    
    useEffect(() => {
        const fetchPedido = async () => {
          try {
            const response = await fetch('http://localhost:3001/pedidos');
    
            if (!response.ok) {
              throw new Error(`Erro ao buscar dados: ${response.statusText}`);
            }
    
            const pedidos = await response.json();
            if (pedidos.length > 0) {
              const pedido = pedidos[0];
              setPedidoId(pedido.id);
              setPedidoPriceTotal(pedido.total);
              setPedidoFormaPagamento(pedido.pagamento);
              setPedidoSituacaoPedido(pedido.status);
              setProdutos(pedido.produtos);
            }
          } catch (error) {
            console.error("Erro ao buscar dados do servidor:", error);
          }
        };
    
        fetchPedido(); // Chamar para carregar dados
      }, []); // Executar ao montar o componente
    
      const handleRatingChange = (newRating) => {
        setAvaliacao(newRating);
      };

    
      const handleEnviarAvaliacao = async () => {
        if (pedidoId === null) {
          setMensagem('Pedido ainda não foi carregado');
          return;
        }

        console.log(avaliacao)
    
        try {
          await axios.patch(`http://localhost:3001/pedidos/${pedidoId}`, { avaliacao } );
          setMensagem('Avaliação enviada com sucesso!');
        } catch (error) {
          setMensagem('Erro ao enviar a avaliação.');
          console.error('Erro ao atualizar a avaliação:', error);
        }
      };
    
      return (
        <div style={{ margin: '0 auto', marginTop: '50px', textAlign: 'center' }}>
          <h2>Status do Pedido: {pedidoSituacaoPedido ? pedidoSituacaoPedido : 'Carregando...'}</h2>
          <h3>ID do Pedido: {pedidoId ? pedidoId : 'Carregando...'}</h3>
          <h1>Produtos do Pedido</h1>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan="5">Carregando produtos...</td>
                </tr>
              ) : (
                produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.desc}</td>
                    <td>{produto.price}</td>
                    <td>{produto.qtd}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <h4>Preço total: {pedidoPriceTotal ? pedidoPriceTotal : 'Carregando...'}</h4>
          <h4>Forma de Pagamento: {pedidoFormaPagamento ? pedidoFormaPagamento : 'Carregando...'}</h4>
          <h5>Avaliação:</h5>
          <StarRating totalStars={5} onRatingChange={handleRatingChange} />
          <Button variant="primary" onClick={handleEnviarAvaliacao}>
            Enviar Avaliação
          </Button>
          {mensagem && (
            <Alert variant={mensagem.includes('sucesso') ? 'success' : 'danger'}>
              {mensagem}
            </Alert>
          )}
        </div>
      );
    };
    
    export default StatusPedido;