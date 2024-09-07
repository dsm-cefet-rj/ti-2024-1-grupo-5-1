const PedidoCard = ({pedido}) => {
    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Pedido {pedido.id}</h5>
                    <p className="card-text">Status: {pedido.status}</p>
                    <p className="card-text">Data: {pedido.date_pedido}</p>
                    <p className="card-text">Total: {pedido.total}</p>
                    <p className="card-text">Pagamento: {pedido.pagamento}</p>
                    <button className="btn btn-primary">Detalhes</button>
                    
                </div>
            </div>
        </>
    );
};

export default PedidoCard;