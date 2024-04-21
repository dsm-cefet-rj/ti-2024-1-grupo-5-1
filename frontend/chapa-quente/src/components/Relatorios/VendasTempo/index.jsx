import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { fetchVendasPorTempo } from '../../../redux/reducers/reportSlice';

const VendasTempo = () => {
    const [option, setOption] = useState('hora');
    const { vendasPorTempo } = useSelector((state) => state.reports);
    const { data, status, error } = vendasPorTempo;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                dispatch(fetchVendasPorTempo());
            } catch (error) {
                console.error(error);
            }
        };
        fetchVendas();
    }, [dispatch, option]);

    const handleChangeOption = (e) => {
        setOption(e.target.value);
    };

    if (status === 'loading') {
        return <h3 style={{ textAlign: 'center' }}>Carregando...</h3>;
    }

    if (status === 'failed') {
        return <h3 style={{ textAlign: 'center' }}>Erro ao carregar os dados: {error}</h3>;
    }

    if (!data || data.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Nenhuma venda encontrada!</h3>;
    }

    return (
        <>
            <h1>Vendas por Tempo</h1>
            <div className="d-flex justify-content-around">
                <select onChange={handleChangeOption} value={option}>
                    <option value="hora">Por hora</option>
                    <option value="dia">Por dia</option>
                    <option value="semana">Por semana</option>
                    <option value="mes">Por mês</option>
                </select>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Item</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.date}>
                            <td>{item.date}</td>
                            <td>{item.item}</td>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default VendasTempo;