import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { register } from '../../redux/reducers/authSlice';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [terms, setTerms] = useState(false);
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
            dispatch(register({ name, surname, email, password, phoneNumber }));
        } catch (error) {
            console.error(error);
        }
    };

    const { isLoggedIn, status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/produtos');
        }

        if (status === 'success' && isLoggedIn === false) {
            toast('Usuário registrado com sucesso! Redirecionando para o Login...', { type: 'success' });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }

        if (status === 'failed') {
            toast('Ocorreu um erro ao tentar registrar o usuário. Verifique suas credenciais e tente novamente.')
        }
    }, [isLoggedIn, navigate, status]);

    return (
        <>
            <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '90px' }}>
                <h2 className="text-center mb-4" style={{ marginBottom: '20px' }}>Preparado para uma explosão de sabor?</h2>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>

                    <div className="mb-2 d-flex">
                        <div style={{ marginRight: '20px' }}>
                            <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
                            <Form.Control type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">Insira um nome.</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div>
                            <FloatingLabel controlId="floatingInput" label="Sobrenome" className="mb-3">
                            <Form.Control type="text" placeholder="Sobrenome" value={surname} onChange={(e) => setSurname(e.target.value)}required/>
                            <Form.Control.Feedback type="invalid">Insira um sobrenome.</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                    </div>

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

                    <Form.Group className="mb-4" controlId="formPhone">
                        <FloatingLabel controlId="floatingInput" label="Telefone" className="mb-3">
                            <Form.Control type="tel" placeholder="2140028922" minLength={10} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">Insira um telefone válido.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4 d-flex justify-content-center" controlId="formTerms">
                        <Form.Check
                                    type="checkbox"
                                    label="Eu li e concordo com os Termos de Serviço."
                                    id="checkTerms"
                                    checked={terms}
                                    onChange={(e) => setTerms(e.target.checked)}
                                    required
                        />
                        <Form.Control.Feedback type="invalid">Você deve aceitar nossos Termos de Serviço.</Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="primary" type="submit" className="btn-block mb-4">Acessar</Button>
                        <p>Já possui uma conta? <a href="/login">Faça login</a>!</p>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Register;