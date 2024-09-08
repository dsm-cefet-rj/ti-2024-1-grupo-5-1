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

  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === 'idle' && !fetched) {
      dispatch(fetchPedidos()).catch(() => setHasError(true));
    }
  }, [dispatch, fetched, status]);

  if (status === 'loading') {
    return (
      <div style={{ maxWidth: '450px', margin: '55px auto 0' }}>
        <h4 className="text-center mb-2">Carregando sua solicitação...</h4>
      </div>
    );
  }
  
  if (hasError || !data) { 
    return (
      <div style={{ maxWidth: '450px', margin: '55px auto 0' }}>
        {hasError ? (
          <>
            <h1 className="text-center mb-1" style={{ marginBottom: '20px' }}>Erro</h1>
            <h4 className="text-center mb-2">Ocorreu um erro ao carregar os dados.</h4>
          </>
        ) : (
          <>
            <h4 className="text-center mb-2">Nenhum item foi encontrado!</h4>
          </>
        )}
      </div>
    );
  } 

  const itemFrequency = {};
  const produtoDetalhes = {};
  let totalItems = 0;

  data.forEach((item) => {
    if (item.status.toLowerCase() === "entregue") {
      item.produtos.forEach((produto) => {
        const produtoId = produto._id;
        const quantidadeVendida = produto.qtd || 1;
  
        itemFrequency[produtoId] = (itemFrequency[produtoId] || 0) + quantidadeVendida;
  
        if (!produtoDetalhes[produtoId]) {
          produtoDetalhes[produtoId] = {
            _id: produto._id,
            nome: produto.nome
          };
        }
      });
    }
  });
  
  if (Object.keys(itemFrequency).length === 0) {
    return (
      <div style={{ maxWidth: '450px', margin: '55px auto 0' }}>
        <h4 className="text-center mb-2">Nenhuma venda foi encontrada!</h4>
      </div>
    );
  }

  totalItems = Object.values(itemFrequency).reduce((sum, count) => sum + count, 0);

  // Configuração do gráfico
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const chartData = {
    labels: Object.values(produtoDetalhes).map((produto) => produto.nome),
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: Object.keys(itemFrequency).map((id) => itemFrequency[id]),
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHitRadius: 30,
        backgroundColor: [
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,

      ],
      borderColor: [
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
          `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
      ],
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
          label: function (context) {
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
  const itemsPerPage = 5;
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = Object.keys(itemFrequency).slice(indexFirstItem, indexLastItem);
  const totalPages = Math.ceil(Object.keys(itemFrequency).length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ maxWidth: '700px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Line data={chartData} options={chartOptions} width={400} height={300} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <p><strong>Total de Itens Vendidos:</strong>{' '}<Badge bg="secondary">{totalItems}</Badge></p>
      </div>
      <div>
        <Table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>ID</th>
              <th>Itens Vendidos</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((id) => (
              <tr key={id}>
                <td>{produtoDetalhes[id]?.nome}</td>
                <td>{produtoDetalhes[id]?._id}</td>
                <td>{itemFrequency[id]}</td>
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
  );
}

export default VendasItem;
