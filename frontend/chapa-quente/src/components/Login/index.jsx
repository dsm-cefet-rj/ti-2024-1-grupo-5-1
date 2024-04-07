import { login } from '../../redux/reducers/authSlice';

import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState(false);
    const [error, setError] = useState({ type: '', message: ''});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            dispatch(login({ email, password }));
        } catch (error) {
            console.error(error);
        }
    };

    const { isLoggedIn, status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/produtos');
        }

        if (status === 'failed') {
            setError({ type: 'danger', message: 'Usuário ou senha inválidos!'})
            setTimeout(() => {
                setError({ type: '', message: ''});
            }, 5000);
        }
    }, [isLoggedIn, navigate, status]);

    return (
        <>
            <div className="login-form d-flex justify-content-center align-items-center">
                <Form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                <legend>Login</legend>
                {error && <Alert key={error.type} variant={error.type}> {error.message} </Alert>}
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Digite seu e-mail'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type={displayPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Digite sua senha'
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

export default Login;