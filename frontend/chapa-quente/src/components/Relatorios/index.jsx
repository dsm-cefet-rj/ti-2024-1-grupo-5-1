import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Cancelamentos from './Cancelamentos';
import Agendamentos from './Agendamentos';
import Fidelizados from './Fidelizados';
import VendasTempo from './VendasTempo';
import Avaliacoes from './Avaliacoes';
import VendasItem from './VendasItem';

const Relatorios = () => {

    const { user, isLoggedIn } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn || user.role !== 'admin') {
            navigate('/');
            toast('Você não tem permissão para acessar esta página!', { type: 'error' });
        }
    }, [isLoggedIn, user, navigate]);

    const [current, setCurrent] = useState('agendamentos');
    const renderReport = () => {
        switch (current) {
            case 'agendamentos':
                return <Agendamentos/>;
            case 'avaliacoes':
                return <Avaliacoes/>;
            case 'cancelamentos':
                return <Cancelamentos/>;
            case 'item':
                return <VendasItem/>;
            case 'fidelizados':
                return <Fidelizados/>;
            case 'tempo':
                return <VendasTempo/>;
        }
    }
    
    return (
        <>
            <div style={{ margin: '0 auto', marginTop: '45px', textAlign: 'center' }}>
                <Stack direction="horizontal" gap={3}>
                    <Button variant={current === 'agendamentos' ? 'primary' : 'secondary'} onClick={() => setCurrent('agendamentos')}>Agendamentos</Button>
                    <Button variant={current === 'avaliacoes' ? 'primary' : 'secondary'} onClick={() => setCurrent('avaliacoes')}>Avaliações</Button>       
                    <Button variant={current === 'cancelamentos' ? 'primary' : 'secondary'} onClick={() => setCurrent('cancelamentos')}>Cancelamentos</Button>
                    <Button variant={current === 'item' ? 'primary' : 'secondary'} onClick={() => setCurrent('item')}>Vendas por Item</Button>
                    <Button variant={current === 'fidelizados' ? 'primary' : 'secondary'} onClick={() => setCurrent('fidelizados')}>Clientes Fidelizados</Button>
                    <Button variant={current === 'tempo' ? 'primary' : 'secondary'} onClick={() => setCurrent('tempo')}>Vendas por Tempo</Button>
                </Stack>
                <div style={{ marginTop: '45px' }}>
                    {renderReport()}
                </div>
            </div>
        </>
    )
};

export default Relatorios;
