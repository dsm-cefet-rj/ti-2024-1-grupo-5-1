import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import StarRating from './starRating';



const StatusPedido = () => {

    const [pedidoId, setPedidoId] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [pedidoPriceTotal, setPedidoPriceTotal] = useState(null);
    const [pedidoFormaPagamento, setPedidoFormaPagamento] = useState(null);
    const [pedidoSituacaoPedido, setPedidoSituacaoPedido] = useState(null);

    
    useEffect(() => {
        const fetchPedido = async () => {
            try {
                // Buscar os dados do json-server
                const response = await fetch('http://localhost:3001/pedidos');
                
                // Verificar se a resposta é bem-sucedida
                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
                }

                // Converter a resposta para JSON
                const pedidos = await response.json();

                // Se houver pedidos, pegar o primeiro e seu ID
                if (pedidos.length > 0) {
                    setPedidoId(pedidos[0].id);
                    setPedidoPriceTotal(pedidos[0].precoTotal)
                    setPedidoFormaPagamento(pedidos[0].formaPagamento)
                    setPedidoSituacaoPedido(pedidos[0].situacaoPedido)
                    const produtosDoPedido = pedidos[0].produtos;
                    setProdutos(produtosDoPedido);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do servidor:", error);
            }
        };

        // Chamar a função para buscar os dados
        fetchPedido();
    }, []);

    const handleRatingChange = (newRating) => {
        console.log(`Nova avaliação do pedido: ${newRating} estrelas`);
        // Aqui, você pode adicionar lógica adicional para processar a mudança de rating
      };

    return (
        <div style={{margin: "0 auto", marginTop: "50px", textAlign: 'center' }}>
            <h2 style={{marginTop: 30}}>Status do Pedido: {pedidoSituacaoPedido ? pedidoSituacaoPedido : 'Carregando...'}</h2>
            <h3> ID do Pedido: {pedidoId ? pedidoId : 'Carregando...'}</h3>     
            <h1>Produtos do Pedido</h1>
            <Table striped bordered hover variant='dark' className='tabela'>
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
                                <td>{produto.quantity}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                </Table>
                <h4> Preço total: {pedidoPriceTotal ? pedidoPriceTotal : 'Carregando...'} </h4>
                <h4> Forma de Pagamento: {pedidoFormaPagamento ? pedidoFormaPagamento: 'Carregando...'} </h4>
                <h5>Avaliação:</h5>
                <StarRating totalStars={5} initialRating={0} onRatingChange={handleRatingChange}/>
        </div>

    )
}

export default StatusPedido;