import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Para acessar o Redux Store
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { selectCurrentUser } from '../../redux/reducers/authSlice'; // Importa o selector

const Pedidos = () => {
  const currentUser = useSelector(selectCurrentUser); // Obtém o usuário do Redux Store
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        if (currentUser) { // Verifica se há um usuário autenticado
          const userId = currentUser.id; // Obtém o `user_id`
          const response = await axios.get(`http://localhost:3001/pedidos?user_id=${userId}`);
          setPedidos(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchPedidos(); // Busca os pedidos do usuário autenticado
  }, [currentUser]); // Reexecuta se `currentUser` mudar

  return (
    <div style={{textAlign:'center'}}>
      <h2>Pedidos do Usuário {currentUser ? currentUser.nome : "Desconhecido"}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.status}</td>
                <td>
                  <Link to={`/statusPedido/${pedido.id}`}>
                    <Button variant="primary">Ver Detalhes</Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum pedido encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Pedidos;
