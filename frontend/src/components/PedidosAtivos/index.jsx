import { Table, Modal, Button, Pagination, Badge, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import AuthService from '../../redux/services/authService';
import { fetchPedidos } from '../../redux/reducers/reportSlice';
import { getFormattedDateTime } from '../../utils/unixDateConversion';
import PedidoCard from "./PedidoCard";
import PedidoModal from "./PedidoModal";

const statusOrder = {
    'Em Andamento': 1,
    'Pendente': 2,
    'Agendado': 3,
    'Entregue': 4,
    'Cancelado': 5
};

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
    }

    const pedidoAtivos = data.filter((pedido) => pedido.status.toLowerCase() === 'pendente' || pedido.status.toLowerCase() === 'em andamento');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = pedidoAtivos.slice(indexFirstItem, indexLastItem);

    const sortedItems = currentItems.sort((a, b) => {
        const aStatusOrder = statusOrder[a.status] || 999;
        const bStatusOrder = statusOrder[b.status] || 999;

        if (statusOrder[a.status] < statusOrder[b.status]) return -1;
        if (statusOrder[a.status] > statusOrder[b.status]) return 1;

        return new Date(b.data) - new Date(a.data);
    });

    const totalPages = Math.ceil(pedidoAtivos.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum pedido cancelado encontrado!</h3>;
    }

    return (
        <>
            {/* <PedidoCard pedido={sortedItems[1]} modalHandleClick={handleShowModal} /> */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: "center"}}>
                <strong style={{marginRight: '2px'}}>Total de Pedidos Ativos:</strong><Badge bg="secondary">{pedidoAtivos.length}</Badge>
            </div>
            <Stack style={{ justifyContent: "center", alignItems: "center" , paddingTop: 0}} gap={1}>
                    {sortedItems.map((pedido, index) => (
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
    );
}

export default PedidosAtivos;