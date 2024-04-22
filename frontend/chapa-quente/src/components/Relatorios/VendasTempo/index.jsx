import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { fetchPedidos } from '../../../redux/reducers/reportSlice';
import { ordenarVendas } from '../../../utils/timeReportFilter';

const VendasTempo = () => {

    const { pedidos } = useSelector((state) => state.reports);
    const { data, status, fetched } = pedidos;

    const pedidosFiltrados = data.filter((pedido) => pedido.status.toLowerCase() === 'entregue');
    const [option, setOption] = useState({ value: 'x', data: '' });
    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle' && !fetched) {
            dispatch(fetchPedidos());
        }
    }, [dispatch, fetched, status]);

    const handleChangeOption = (e) => {
        const dadosOrdenados = ordenarVendas(e.target.value, pedidosFiltrados);
        setOption({ value: e.target.value, data: dadosOrdenados });
    };

    if (!data || data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhuma venda encontrada!</h3>;
    }

    // Configuração do gráfico

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const barData = {
        labels: Object.keys(option.data),
        datasets: [
            {
                label: 'Vendas',
                data: Object.values(option.data),
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const barOptions = {
        responsive: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Período',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vendas',
                },
                ticks: {
                    callback: function (value) {
                        return value;
                    },
                    stepSize: 1,
                }
            },
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
                text: `Quantia de Vendas por Tempo (${option.value})`,
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

    return (
        <>
            <div style={{ maxWidth: '1000px', maxHeight: '800px', overflow: 'auto', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Form.Select value={option.value} onChange={handleChangeOption} style={{ marginBottom: '20px' }}>
                        <option disabled value="x">Selecione uma data...</option>
                        <option value="hora">Últimas 24 horas</option>
                        <option value="dia">Últimos 7 dias</option>
                        <option value="mes">Últimos 12 meses</option>
                        <option value="ano">Últimos anos</option>
                    </Form.Select>
                </div>
                {option.value !== 'x' && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <Bar data={barData} options={barOptions} width={400} height={300} />
                    </div>
                )}
                <div>
                    <Table style={{ width: '100%', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th>Período</th>
                                <th>Vendas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(option.data).map(([periodo, vendas]) => (
                                <tr key={periodo}>
                                    <td>{periodo}</td>
                                    <td>{vendas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default VendasTempo;