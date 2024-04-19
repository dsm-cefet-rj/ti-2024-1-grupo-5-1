import { Table, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

import AuthService from '../../../redux/services/authService';
import { fetchAgendamentos } from '../../../redux/reducers/reportSlice';
import { getFormattedDateTime } from '../../../utils/unixDateConversion';

const Agendamentos = () => {
    const [selectedOrder, setSelectedOrder] = useState({ schedule_info: {}, user_info:{}});
    const [showModal, setShowModal] = useState(false);

    const { agendamentos } = useSelector((state) => state.reports);
    const { data, status, fetched } = agendamentos;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!fetched) {
            dispatch(fetchAgendamentos());
        }
    }, [dispatch, fetched, status]);

    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum agendamento encontrado!</h3>;
    }

    const handleShowModal = async (item) => {
        try {
            const user_info = await AuthService.fetch(item.user_id);
            setSelectedOrder({ schedule_info: item, user_info: user_info});
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    }

    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum agendamento encontrado!</h3>;
    }

    return (
        <>
            <div style={{ maxWidth: '1000px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
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
                        {data.map((item) => (
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
                                            <p style={{ marginBottom: '10px'}}><strong>Nome:</strong> {selectedOrder.user_info.nome} {selectedOrder.user_info.sobrenome}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Email:</strong> {selectedOrder.user_info.email}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Telefone:</strong> {selectedOrder.user_info.telefone}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Endereço:</strong> {selectedOrder.user_info.logradouro}, {selectedOrder.user_info.numero} - {selectedOrder.user_info.cep} - {selectedOrder.user_info.bairro}, {selectedOrder.user_info.cidade}</p>
                                        </div>
                                        <hr />
                                        <div>
                                            <h5>Informações do Pedido</h5>
                                            <p style={{ marginBottom: '10px'}}><strong>Detalhes:</strong> {selectedOrder.schedule_info.detalhes}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Pagamento:</strong> {selectedOrder.schedule_info.pagamento}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Data do Pedido:</strong> {getFormattedDateTime(selectedOrder.schedule_info.date_pedido)}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Data Agendada:</strong> {getFormattedDateTime(selectedOrder.schedule_info.date_agendada)}</p>
                                            <p style={{ marginBottom: '10px'}}><strong>Total:</strong> {selectedOrder.schedule_info.total}</p>
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
        </>
    )
}

export default Agendamentos;