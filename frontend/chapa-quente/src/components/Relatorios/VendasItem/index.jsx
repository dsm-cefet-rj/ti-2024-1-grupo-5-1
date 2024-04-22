import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Table, Pagination, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";

import { fetchPedidos } from '../../../redux/reducers/reportSlice';

const VendasItem = () => {
    const { pedidos } = useSelector((state) => state.reports);
    const { data, status, fetched } = pedidos;

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle' && !fetched) {
            dispatch(fetchPedidos());
        }
    }, [dispatch, fetched, status]);

    const itemFrequency = {};

    data.forEach((item) => {
      if (item.status.toLowerCase() === "entregue") {
        item.produtos.forEach((produto) => {
          if (itemFrequency[produto.id]) {
            itemFrequency[produto.id]++;
          } else {
              itemFrequency[produto.id] = 1;
          }
        });
      }
    });

    let totalItems = 0;
    for (const key in itemFrequency) {
        totalItems += itemFrequency[key];
    }

    // Configuração do gráfico

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const chartData = {
        labels: Object.keys(itemFrequency).map((key) => `Item ${key}`),
        datasets: [
            {
                label: 'Avaliações',
                data: Object.values(itemFrequency),
                fill: false,
                tension: 0.1,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHitRadius: 30,
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
                  callback: function(value) {
                      return value;
                  },
                  stepSize: 1,
                }
            }
        },
        plugins: {
            legend: {
                display: false,
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
                text: 'Quantia de Itens Vendidos por Produto',
                font: {
                    size: 18,
                    color: 'black',
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Total: ${context.raw}`;
                    }
                }
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    // Configuração da tabela

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = Object.keys(itemFrequency).slice(indexFirstItem, indexLastItem);

    const totalPages = Math.ceil(Object.keys(itemFrequency).length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    if (data.length === 0) {
      return (
        <h3 style={{ textAlign: 'center' }}>Nenhuma avaliação encontrada!</h3>
      );
    }

    return (
        <>
          <div style={{ maxWidth: '900px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
              <Line data={chartData} options={chartOptions} width={400} height={300} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
              <p><strong>Total de Itens Vendidos:</strong>{' '}<Badge bg="secondary">{totalItems}</Badge></p>
            </div>
            <div>
             <Table style={{ width: '100%', tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Itens Vendidos</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((key) => (
                    <tr key={key}>
                      <td>Item {key}</td>
                      <td>{itemFrequency[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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

export default VendasItem;