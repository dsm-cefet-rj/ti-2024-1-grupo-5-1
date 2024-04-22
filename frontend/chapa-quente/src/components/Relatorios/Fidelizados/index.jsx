import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Table, Modal, Button, Stack, Badge, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';

import AuthService from '../../../redux/services/authService';
import { fetchPedidos } from '../../../redux/reducers/reportSlice';
import { getFormattedDateTime } from '../../../utils/unixDateConversion';

const Fidelizados = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { pedidos } = useSelector((state) => state.reports);
    const { data, status, fetched } = pedidos;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!fetched) {
            dispatch(fetchPedidos());
        }
    }, [dispatch, fetched, status]);

    useEffect(() => {
        const alignUsersWithData = async () => {
            const userFrequency = {};

            const filteredData = data.filter((pedido) => pedido.status.toLowerCase() === 'entregue');

            filteredData.forEach((pedido) => {
                const user_id = pedido.user_id;
                if (userFrequency[user_id]) {
                    userFrequency[user_id] += 1;
                } else {
                    userFrequency[user_id] = 1;
                }
            });

            const users = await AuthService.fetchMany();
            const alignedData = users.map((user) => {
                const user_id = user.id;
                const user_info = user;
                const frequency = userFrequency[user_id] || 0;
                const lastOrder = filteredData.find((pedido) => pedido.user_id === user_id) || null;
                return { user_info, lastOrder, frequency };
            });

            setAlignedData(alignedData);
        };

        alignUsersWithData();

    }, [data]);

    const [alignedData, setAlignedData] = useState([]);
    const totalPedidos = alignedData.reduce((acc, curr) => acc + curr.frequency, 0);
    const totalUsers = alignedData.length;

    const sortedData = alignedData.sort((a, b) => b.frequency - a.frequency);
    const removeZeros = sortedData.filter((item) => item.frequency > 0);

    // Construção do gráfico

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const chartData = {
        labels: removeZeros.map((item) => item.user_info.nome),
        datasets: [
            {
                label: 'Clientes Fidelizados',
                data: removeZeros.map((item) => item.frequency),
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const chartOptions = {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    padding: 20,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Clientes Fidelizados',
                font: {
                    size: 18,
                    color: 'black',
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Pedidos: ${context.raw}`;
                    }
                }
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    const handleShowModal = async (item) => {
        try {
            setSelectedUser({ user_info: item.user_info, frequency: item.frequency });
            setShowModal(true);
        } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexFirstItem, indexLastItem);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };


    if (data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhum cliente encontrado!</h3>;
    }

    return (
        <>
            <div style={{ maxWidth: '900px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Bar data={chartData} options={chartOptions} width={250} height={300} />
                </div>
                <Stack direction="horizontal" style={{ justifyContent: 'center', marginBottom: '10px' }} gap={3}>
                    <p>
                        <strong>Total de Usuários:</strong> <Badge bg="secondary">{sortedData.length}</Badge>
                    </p>
                    <p>
                        <strong>Total de Pedidos:</strong> <Badge bg="secondary">{totalPedidos}</Badge>
                    </p>
                    <p>
                        <strong>Média para Fidelidade:</strong>{' '}
                        <Badge bg="secondary">{(totalPedidos / totalUsers).toFixed(2)}</Badge>
                    </p>
                </Stack>
                <div>
                    <Table style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade de Pedidos</th>
                                <th>Último Pedido</th>
                                <th>Detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} onClick={() => handleShowModal(item)}>
                                    {item.frequency > 5 ? <td style={{ color: 'blue' }}>{item.user_info.nome}</td> : <td>{item.user_info.nome}</td>}
                                    {item.frequency > 5 ? <td style={{ color: 'blue' }}>{item.frequency}</td> : <td>{item.frequency}</td>}
                                    {item.lastOrder ? <td>{getFormattedDateTime(item.lastOrder.date)}</td> : <td>Nenhum pedido feito</td>}
                                    <td>
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
                            <Modal.Title>Detalhes do Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedUser && (
                                <>
                                    <div style={{ marginBottom: '10px' }}>
                                        <p><strong>Nome:</strong> {selectedUser.user_info.nome} {selectedUser.user_info.sobrenome}</p>
                                        <p><strong>Email:</strong> {selectedUser.user_info.email}</p>
                                        <p><strong>Telefone:</strong> {selectedUser.user_info.telefone}</p>
                                        <p><strong>Endereço:</strong> {selectedUser.user_info.logradouro}, {selectedUser.user_info.numero} - {selectedUser.user_info.cep} - {selectedUser.user_info.bairro}, {selectedUser.user_info.cidade}</p>
                                        <p><strong>Quantidade de Pedidos:</strong> {selectedUser.frequency}</p>
                                    </div>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Pagination className="d-flex justify-content-center">
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </div>
        </>
    );
}

export default Fidelizados;