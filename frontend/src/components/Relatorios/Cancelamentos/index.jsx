import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Table, Modal, Button, Pagination, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

import AuthService from '../../../redux/services/authService';
import { fetchPedidos } from '../../../redux/reducers/reportSlice';
import { getFormattedDateAndTime } from '../../../utils/dateConversion';

const Cancelamentos = () => {
    const [selectedOrder, setSelectedOrder] = useState({ order_info: {}, user_info: {} });
    const [showModal, setShowModal] = useState(false);

    const { pedidos } = useSelector((state) => state.reports);
    const { data, status, fetched } = pedidos;

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle' && !fetched) {
            dispatch(fetchPedidos());
        }
    }, [dispatch, fetched, status]);

    const handleShowModal = async (item) => {
        try {
            const user_info = await AuthService.fetchOne(item.user_id);
            setSelectedOrder({ order_info: item, user_info: user_info });
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    }

    const cancelados = data.filter((pedido) => pedido.status.toLowerCase() === 'cancelado');

    // Configuração do gráfico

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const barData = {
        labels: ['Pedidos x Cancelamentos'],
        datasets: [
            {
                label: 'Pedidos Totais',
                data: [data.length],
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Pedidos Cancelados',
                data: [cancelados.length],
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        ],
    };

    const barOptions = {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value.toFixed(1);
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    padding: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Pedidos x Cancelamentos',
                font: {
                    size: 18,
                    color: 'black',
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Quantidade: ${context.raw}`;
                    }
                }
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };


    // Configuração da tabela

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = cancelados.slice(indexFirstItem, indexLastItem);

    const totalPages = Math.ceil(cancelados.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum pedido cancelado encontrado!</h3>;
    }

    return (
        <>
            <div style={{ maxWidth: '900px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Bar data={barData} options={barOptions} width={250} height={300} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <p><strong>Total de Cancelamentos:</strong>{' '}<Badge bg="secondary">{cancelados.length} ({((cancelados.length / data.length) * 100).toFixed(2)}%)</Badge></p>
                </div>
                <div style={{ maxWidth: '80%', margin: '0 auto', overflowX: 'auto' }}>
                    <Table style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>ID</th>
                                <th style={{ width: '20%' }}>Data</th>
                                <th style={{ width: '15%' }}>Valor</th>
                                <th style={{ width: '25%' }}>Pagamento</th>
                                <th style={{ width: '15%' }}>Informações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((pedido) => (
                                <tr key={pedido._id}>
                                    <td style={{ wordWrap: 'break-word' }}>{pedido._id}</td>
                                    <td>{getFormattedDateAndTime(pedido.date_pedido)}</td>
                                    <td>{'R$ ' + (pedido.total).toFixed(2)}</td>
                                    <td>{pedido.pagamento}</td>
                                    <td>
                                        <Button variant="link" onClick={() => handleShowModal(pedido)}>
                                            <InfoCircleFill />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Informações do Pedido {selectedOrder && selectedOrder.order_info._id} (Cancelado)</Modal.Title>
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
                                            <p style={{ marginBottom: '10px' }}><strong>Data do Pedido:</strong> {getFormattedDateAndTime(selectedOrder.order_info.date_pedido)}</p>
                                            <p style={{ marginBottom: '10px' }}><strong>Total:</strong> R$ {parseFloat(selectedOrder.order_info.total).toFixed(2)}</p>
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
                    <Pagination className="d-flex justify-content-center">
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </div>
        </>
    );
}

export default Cancelamentos;