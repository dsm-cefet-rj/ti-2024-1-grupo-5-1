import { Form, FloatingLabel, Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { login } from '../../redux/reducers/authSlice';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

       const form = e.currentTarget;
       if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
       }
        
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
            toast('Usuário ou senha incorretos!', { type: 'error' });
        } else if (status === 'success') {
            toast('Login realizado com sucesso!', { type: 'success' });
        }
    }, [isLoggedIn, navigate, status]);

    return (
        <>
            <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '90px' }}>
                <h2 className="text-center mb-4" style={{ marginBottom: '20px' }}>Bem-vindo ao sabor que vai fazer o seu dia!</h2>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>

                    <Form.Group className="mb-4" controlId="formEmail">
                        <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3">
                            <Form.Control type="email" placeholder="Insira seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">Insira um e-mail válido.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPassword">
                        <FloatingLabel controlId="floatingInput" label="Senha" className="mb-3">
                            <Form.Control type="password" placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">Insira uma senha.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="primary" type="submit" className="btn-block mb-4">Acessar</Button>
                        <p>Não possui conta? <a href="/register">Cadastre-se</a>!</p>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Login;