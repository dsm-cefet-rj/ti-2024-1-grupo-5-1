import { Pagination, Badge, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import AuthService from '../../redux/services/authService';
import { fetchPedidos } from '../../redux/reducers/reportSlice';
import PedidoCard from "./PedidoCard";
import PedidoModal from "./PedidoModal";

const statusOrder = {
    'em andamento': 1,
    'pendente': 2,
    'agendado': 3
};

const PedidosAtivos = () => {
    const [selectedOrder, setSelectedOrder] = useState({ order_info: {}, user_info: {} });
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (!data) {
        return (
            <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '55px' }}>
                <h4 className="text-center mb-2">Não foi possível carregar os pedidos ativos.</h4>
            </div>
        );
    }

    const pedidoAtivos = data.filter((pedido) =>
        pedido.status.toLowerCase() === 'em andamento' ||
        pedido.status.toLowerCase() === 'pendente' ||
        pedido.status.toLowerCase() === 'agendado'
    );

    const sortedItems = pedidoAtivos.sort((a, b) => {
        const aStatusOrder = statusOrder[a.status.toLowerCase()] || 999;
        const bStatusOrder = statusOrder[b.status.toLowerCase()] || 999;

        if (aStatusOrder < bStatusOrder) return -1;
        if (aStatusOrder > bStatusOrder) return 1;

        return new Date(b.data) - new Date(a.data);
    });

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexFirstItem, indexLastItem);

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {data.length === 0 ? (
                <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '55px' }}>
                    <h4 className="text-center mb-2">Carregando pedidos, por favor aguarde...</h4>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
                        <strong style={{ marginRight: '2px' }}>Total de Pedidos Ativos:</strong>
                        <Badge bg="secondary">{sortedItems.length}</Badge>
                    </div>
                    <Stack style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 0 }} gap={1}>
                        {currentItems.map((pedido, index) => (
                            <PedidoCard key={index} pedido={pedido} modalHandleClick={handleShowModal} />
                        ))}
                        <PedidoModal showModal={showModal} handleCloseModal={handleCloseModal} selectedOrder={selectedOrder} />
                        <Pagination className="d-flex justify-content-center">
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </Stack>
                </>
            )}
        </>
    );
};

export default PedidosAtivos;
