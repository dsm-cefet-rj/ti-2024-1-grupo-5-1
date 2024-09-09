import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Stack, Pagination } from 'react-bootstrap';

import { fetchFromUser } from '../../redux/reducers/pedidoSlice';
import PedidoCard from './PedidoCard';

const Pedidos = ({ user }) => {
  const { pedidos } = useSelector((state) => state.pedido);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user) {
      dispatch(fetchFromUser(user.id));
    }
  }, [dispatch, user]);

  if (!pedidos) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '55px' }}>
        <h4 className="text-center mb-2">Não foi possível carregar seus pedidos.</h4>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '55px' }}>
        <h4 className="text-center mb-2">Nenhum pedido encontrado! Que tal fazer um agora? :)</h4>
      </div>
    );
  }

  const orderedItems = [...pedidos].sort((a, b) => {
    return new Date(a.data_pedido) - new Date(b.data_pedido);
  });

  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = orderedItems.slice(indexFirstItem, indexLastItem);

  const totalPages = Math.ceil(orderedItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Stack style={{ justifyContent: "center", alignItems: "center", paddingTop: 0 }} gap={1}>
      {currentItems.map((pedido, index) => (
        <PedidoCard key={index} pedido={pedido} />
      ))}
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
  );
};

export default Pedidos;
