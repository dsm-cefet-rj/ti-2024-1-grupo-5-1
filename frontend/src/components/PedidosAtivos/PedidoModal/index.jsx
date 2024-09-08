import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const PedidoModal = ({ showModal, handleCloseModal, selectedOrder }) => {
    const date = new Date(selectedOrder.order_info.date_pedido);
    const formattedDate = `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`;

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Informações do Pedido {selectedOrder && selectedOrder.order_info.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '10px' }}>
                    {
                        selectedOrder && (
                            <>
                                <div>
                                    <h5>Informações do Usuário</h5>
                                    <p style={{ marginBottom: '10px' }}><strong>Nome:</strong> {selectedOrder.user_info.nome} {selectedOrder.user_info.sobrenome}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {selectedOrder.user_info.email}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Telefone:</strong> {selectedOrder.user_info.telefone}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Endereço:</strong> {selectedOrder.user_info.logradouro}, {selectedOrder.user_info.numero} - {selectedOrder.user_info.cep} - {selectedOrder.user_info.bairro}, {selectedOrder.user_info.cidade}</p>
                                </div>
                                <hr />
                                <div>
                                    <h5>Informações do Pedido</h5>
                                    <p style={{ marginBottom: '10px' }}><strong>Detalhes:</strong> {selectedOrder.order_info.detalhes}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Pagamento:</strong> {selectedOrder.order_info.pagamento}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Data do Pedido:</strong> {formattedDate}</p>
                                    <p style={{ marginBottom: '10px' }}><strong>Total:</strong> {selectedOrder.order_info.total}</p>
                                    {selectedOrder.order_info.produtos && selectedOrder.order_info.produtos.length > 0 ? (
                                        selectedOrder.order_info.produtos.map((produto) => (
                                            <div key={produto._id}>
                                                <p style={{ marginBottom: '10px' }}><strong>- </strong> {produto.nome}: {produto.qtd} unidade(s) (R$ {(produto.price * produto.qtd).toFixed(2)})</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Nenhum produto encontrado!</p>
                                    )}
                                </div>
                            </>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PedidoModal;