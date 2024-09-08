import Stack from 'react-bootstrap/Stack';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../redux/reducers/pedidoSlice';
import { toast } from 'react-toastify';

import { getFormattedDateAndTime } from '../../../utils/dateConversion';

const PedidoCard = ({ pedido, modalHandleClick }) => {
    const dispatch = useDispatch();

    const [orderStatus, setOrderStatus] = useState(pedido.status);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setOrderStatus(newStatus);
        dispatch(updateStatus([pedido._id, newStatus]))
            .then(() => {
                toast(`Pedido ${pedido._id} marcado como ${newStatus}`, { type: 'info' });
            }
            );
    };

    useEffect(() => {
        setOrderStatus(pedido.status);
    }, [pedido.status]);

    const statusOrder = [
        'Em Andamento',
        'Cancelado',
        'Agendado',
        'Entregue',
        'Pendente'
    ];

    return (
        <>
            <div className="card" style={{ minWidth: '50vw' }}>
                <div className="card-body">
                    <Stack direction='horizontal' style={{ justifyContent: 'space-between' }}>
                        <h5 className="card-title">Pedido {pedido._id}</h5>
                        <p className="card-text">Status: {pedido.status}</p>
                    </Stack>
                    <Stack direction='horizontal' style={{ justifyContent: 'space-between' }}>
                        <p className="card-text">Data: {getFormattedDateAndTime(pedido.date_pedido)}</p>
                        <Stack direction='horizontal' gap={2}>
                            <p>Pagamento: {pedido.pagamento}</p>
                            <p>Total: R$ {pedido.total.toFixed(2)}</p>
                        </Stack>
                    </Stack>
                    <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                        <button className="btn btn-primary" onClick={(e) => modalHandleClick(pedido)}>Detalhes</button>
                        <div className="dropdown">
                            <select className="form-select" value={orderStatus} onChange={(e) => handleStatusChange(e)}>
                                {statusOrder.map((status) => <option key={status} value={status}>{status}</option>)}
                            </select>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default PedidoCard;