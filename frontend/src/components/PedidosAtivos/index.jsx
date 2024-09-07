import { Table, Modal, Button, Pagination, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import AuthService from '../../redux/services/authService';
import { fetchPedidos } from '../../redux/reducers/reportSlice';
import { getFormattedDateTime } from '../../utils/unixDateConversion';

const PedidosAtivos = () => {
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

    const emAndamento = data.filter((pedido) => pedido.status.toLowerCase() === 'em andamento');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = emAndamento.slice(indexFirstItem, indexLastItem);

    const totalPages = Math.ceil(emAndamento.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum pedido cancelado encontrado!</h3>;
    }

    return (
        <>
            <div style={{ maxWidth: '900px', maxHeight: '800px', overflow: 'auto', margin: '0 auto', marginTop: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <p><strong>Total de Pedidos Ativos:</strong>{' '}<Badge bg="secondary">{emAndamento.length}</Badge></p>
                </div>
                <div>
                    <Table style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th colSpan="2">Método de Pagamento</th>
                                <th>Informações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((pedido, index) => (
                                <tr key={pedido.id}>
                                    <td>{index + 1}</td>
                                    <td>{pedido.status}</td>
                                    <td>{getFormattedDateTime(pedido.date_pedido)}</td>
                                    <td>{pedido.total}</td>
                                    <td colSpan="2">{pedido.pagamento}</td>
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
                                            <p style={{ marginBottom: '10px' }}><strong>Data do Pedido:</strong> {getFormattedDateTime(selectedOrder.order_info.date_pedido)}</p>
                                            <p style={{ marginBottom: '10px' }}><strong>Total:</strong> {selectedOrder.order_info.total}</p>
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

export default PedidosAtivos;