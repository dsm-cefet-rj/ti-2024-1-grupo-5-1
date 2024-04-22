import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { fetchPedidos } from '../../../redux/reducers/reportSlice';

const VendasTempo = () => {
    const [option, setOption] = useState('hora');

    const { pedidos } = useSelector((state) => state.reports);
    const { data, status, fetched } = pedidos;

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle' && !fetched) {
            dispatch(fetchPedidos());
        }
    }, [dispatch, fetched, status]);

    const handleChangeOption = (e) => {
        setOption(e.target.value);
    };

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