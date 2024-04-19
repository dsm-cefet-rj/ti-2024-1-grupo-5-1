import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Cancelamentos from './Cancelamentos';
import Agendamentos from './Agendamentos';
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

    const [current, setCurrent] = useState('');
    const renderReport = () => {
        switch (current) {
            case 'agendamentos':
                return <Agendamentos/>;
            case 'avaliacoes':
                return <Avaliacoes/>;
            case 'cancelamentos':
                return <Cancelamentos/>;
            case 'vendas':
                return <VendasItem/>;
            default:
                return <img src="https://chito.ge/4nHo2ZZ.png" alt="placeholder" />;
        }
    }
    
    return (
        <>
            <div style={{ margin: '0 auto', marginTop: '45px', textAlign: 'center' }}>
                <ButtonGroup>
                    <Button variant={current === 'agendamentos' ? 'primary' : 'secondary'} onClick={() => setCurrent('agendamentos')}>Agendamentos</Button>
                    <Button variant={current === 'avaliacoes' ? 'primary' : 'secondary'} onClick={() => setCurrent('avaliacoes')}>Avaliações</Button>       
                    <Button variant={current === 'cancelamentos' ? 'primary' : 'secondary'} onClick={() => setCurrent('cancelamentos')}>Cancelamentos</Button>
                    <Button variant={current === 'vendas' ? 'primary' : 'secondary'} onClick={() => setCurrent('vendas')}>Vendas por Item</Button>
                </ButtonGroup>
                <div style={{ marginTop: '45px' }}>
                    {renderReport()}
                </div>
            </div>
        </>
    )
};

export default Relatorios;
