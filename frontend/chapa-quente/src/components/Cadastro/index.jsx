import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { register } from '../../redux/reducers/authSlice';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState(false);
    const [error, setError] = useState({ type: '', message: '' });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            dispatch(register({ email, password }));
        } catch (error) {
            console.error(error);
        }
    };

    const { isLoggedIn, status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/landing');
        }

        if (status === 'success' && isLoggedIn === false) {
            setError({ type: 'success', message: 'Usuário registrado com sucesso! Redirecionando a página de login...' })
            setTimeout(() => {
                navigate('/login');
            }, 7000);
        }

        if (status === 'failed') {
            setError({ type: 'danger', message: 'Erro ao registrar usuário!' });
        }
    }, [isLoggedIn, navigate, status]);

    return (
        <>
            <div className="login-form d-flex justify-content-center align-items-center">
                <Form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                <legend>Cadastro</legend>
                {error && <Alert key={error.type} variant={error.type}> {error.message} </Alert>}
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type={displayPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form-check">
                        <Form.Check
                            type="checkbox"
                            id="show-password"
                            label="Mostrar senha"
                            checked={displayPassword}
                            onChange={(e) => setDisplayPassword(e.target.checked)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Acessar
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default Cadastro;