import Stack from 'react-bootstrap/Stack';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../redux/reducers/pedidoSlice';

const PedidoCard = ({ pedido , modalHandleClick}) => {
    const date = new Date(pedido.date_pedido);
    const formattedDate = `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`;

    const dispatch = useDispatch();

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        dispatch(updateStatus([pedido._id, newStatus ]));
    };

    return (
        <>
            <div className="card" style={{minWidth: '50vw'}}>
                <div className="card-body">
                    <Stack direction='horizontal' style={{justifyContent: 'space-between'}}>
                        <h5 className="card-title">Pedido {pedido._id}</h5>
                        <p className="card-text">Status: {pedido.status}</p>
                    </Stack>
                    <Stack direction='horizontal' style={{justifyContent: 'space-between'}}>
                        <p className="card-text">Data: {formattedDate}</p>
                        <Stack direction='horizontal' gap={2}>
                            <p>Pagamento: {pedido.pagamento}</p>
                            <p>Total: R$ {pedido.total.toFixed(2)}</p>
                        </Stack>
                    </Stack>
                    <Stack direction='horizontal' gap={2} style={{justifyContent: 'space-between'}}>
                        <button className="btn btn-primary" onClick={(e) => modalHandleClick(pedido)}>Detalhes</button>
                        <div className="dropdown">
                            <select className="form-select" onChange={(e) => handleStatusChange(e)}>
                                <option value="Em Andamento">Em Andamento</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default PedidoCard;