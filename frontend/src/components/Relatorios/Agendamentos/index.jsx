import { Table, Modal, Button, Badge, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

import AuthService from '../../../redux/services/authService';
import { fetchPedidos } from '../../../redux/reducers/reportSlice';
import { getFormattedDateAndTime } from '../../../utils/dateConversion';

const Agendamentos = () => {
    const [selectedOrder, setSelectedOrder] = useState({ schedule_info: {}, user_info: {} });
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    const { pedidos } = useSelector((state) => state.reports);
    const { data, status, fetched } = pedidos;

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle' && !fetched) {
            dispatch(fetchPedidos());
        }
    }, [dispatch, fetched, status]);

    const filter = data.filter((item) => item.status.toLowerCase() === "agendado");

    const handleShowModal = async (item) => {
        try {
            const user_info = await AuthService.fetchOne(item.user_id);
            setSelectedOrder({ schedule_info: item, user_info: user_info });
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    }

    if (filter.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum agendamento encontrado!</h3>;
    }

    const itemsPerPage = 5;

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = filter.slice(indexFirstItem, indexLastItem);

    const totalPages = Math.ceil(filter.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <>
            <div style={{ maxWidth: '900px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <p><strong>Total de Agendamentos:</strong>{' '}<Badge bg="secondary">{filter.length}</Badge></p>
                </div>
                <Table style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th colSpan="2">Detalhes</th>
                            <th>Pagamento</th>
                            <th>Data Agendada</th>
                            <th>Total</th>
                            <th>Informações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td colSpan="2">{item.detalhes}</td>
                                <td>{item.pagamento}</td>
                                <td>{getFormattedDateTime(item.date_agendada)}</td>
                                <td>{item.total}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button variant="link" onClick={() => handleShowModal(item)}>
                                        <InfoCircleFill />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Informações do Agendamento {selectedOrder && selectedOrder.schedule_info.id}</Modal.Title>
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
                                        <p style={{ marginBottom: '10px' }}><strong>Detalhes:</strong> {selectedOrder.schedule_info.detalhes}</p>
                                        <p style={{ marginBottom: '10px' }}><strong>Pagamento:</strong> {selectedOrder.schedule_info.pagamento}</p>
                                        <p style={{ marginBottom: '10px' }}><strong>Data do Pedido:</strong> {getFormattedDateAndTime(selectedOrder.schedule_info.date_pedido)}</p>
                                        <p style={{ marginBottom: '10px' }}><strong>Data Agendada:</strong> {getFormattedDateAndTime(selectedOrder.schedule_info.date_agendada)}</p>
                                        <p style={{ marginBottom: '10px' }}><strong>Total:</strong> {selectedOrder.schedule_info.total}</p>
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
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </>
    )
}

export default Agendamentos;