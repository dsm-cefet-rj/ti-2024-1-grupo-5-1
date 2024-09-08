
import { Button, Stack } from 'react-bootstrap';

import { getFormattedDateAndTime } from '../../../utils/dateConversion';

const PedidoCard = ({ pedido }) => {

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
                        <Button href={`/statusPedido/${pedido._id}`} variant="success">Detalhes</Button>
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default PedidoCard;