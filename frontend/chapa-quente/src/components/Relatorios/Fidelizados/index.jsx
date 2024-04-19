import { InfoCircleFill } from "react-bootstrap-icons";
import { Table, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchClientesFidelizados } from '../../../redux/reducers/reportSlice';

const Fidelizados = () => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const { clientesFidelizados } = useSelector((state) => state.reports);
    const { data, status, fetched } = clientesFidelizados;

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle' && !fetched) {
            dispatch(fetchClientesFidelizados());
        }
    }, [dispatch, fetched, status]);

    const handleShowModal = (item) => {
        setSelectedReview(item);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReview(null);
    }

    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum cliente fidelizado encontrado!</h3>;
    }

    return (
        <>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="d-flex justify-content-between">
                    <h1 className="mb-4">Relatório de Clientes Fidelizados</h1>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Pedidos</th>
                            <th>Data de Último Pedido</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.orders}</td>
                                <td>{item.last_order_date}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button variant="primary" onClick={() => handleShowModal(item)}>
                                        <InfoCircleFill style={{ fontSize: '20px' }} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Informações de Avaliação {selectedReview && selectedReview.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedReview && JSON.stringify(selectedReview)}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Fidelizados;
