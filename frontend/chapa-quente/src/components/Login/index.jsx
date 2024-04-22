import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { formSchemaR } from '../../utils/userFormValidation';
import { login } from '../../redux/reducers/authSlice';

const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        senha: '' 
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };

    
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await formSchemaR.validate(formData, { abortEarly: false });
            const { email, senha } = formData;
            dispatch(login({ email, senha }))
        } catch (error) {
            if (error.inner) {
                const errors = error.inner.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                console.log(errors)
                setFormErrors(errors);
            } else {
                toast(`Erro ao efetuar Login: ${error.message}` , { type: 'error' })
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/produtos');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '90px' }}>
                <h2 className="text-center mb-4" style={{ marginBottom: '20px' }}>Bem-vindo ao sabor que vai fazer o seu dia!</h2>
                <Form noValidate onSubmit={handleSubmit}>

                    <Form.Group className="mb-4" controlId="formEmail">
                        <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3">
                            <Form.Control type="email" name="email" placeholder="Insira seu e-mail" value={formData.email} isInvalid={!!formErrors.email} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPassword">
                        <FloatingLabel controlId="floatingInput" label="Senha" className="mb-3">
                            <Form.Control type="password" name="senha" placeholder="Insira sua senha" value={formData.senha} isInvalid={!!formErrors.senha} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">{formErrors.senha}</Form.Control.Feedback>
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