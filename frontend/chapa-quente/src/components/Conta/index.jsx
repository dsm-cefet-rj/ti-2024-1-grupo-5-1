import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getDateFromUnix } from '../../utils/unixDateConversion';
import { formSchemaU } from '../../utils/userFormValidation';
import { update } from '../../redux/reducers/authSlice';

const Conta = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoggedIn, status } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        senha: user.senha,
        telefone: user.telefone,
        logradouro: user.logradouro,
        numero: user.numero,
        complemento: user.complemento,
        bairro: user.bairro,
        cidade: user.cidade,
        cep: user.cep,
        id: user.id,
        date: user.date
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await formSchemaU.validate(formData, { abortEarly: false });
            dispatch(update(formData));
        } catch (error) {
            if (error.inner) {
                const errors = error.inner.reduce((acc, current) => {
                    acc[current.path] = current.message;
                    return acc;
                }, {});
                setFormErrors(errors);
            } else {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            toast('Você precisa estar logado para acessar essa página.', { type: 'error' });
        }

        if (status === 'success') {
            toast('Cadastro atualizado com sucesso!', { type: 'success' });
        }
    }, [isLoggedIn, navigate, status]);

    return (
        <>
            <div style={{ maxWidth: '450px', margin: '0 auto', marginTop: '55px' }}>
                <h2 className="text-center mb-4" style={{ marginBottom: '20px' }}>Mantenha seu cadastro em dia!</h2>
                <Form noValidate onSubmit={handleSubmit}>

                    <div className="mb-2 d-flex">
                        <div style={{ marginRight: '20px' }}>
                            <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
                                <Form.Control type="text" name="nome" placeholder="Nome" value={formData.nome} isInvalid={!!formErrors.nome} onChange={handleChange} required/>
                                <Form.Control.Feedback type="invalid">{formErrors.nome}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div>
                            <FloatingLabel controlId="floatingInput" label="Sobrenome" className="mb-3">
                                <Form.Control type="text" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} isInvalid={!!formErrors.sobrenome} onChange={handleChange}required/>
                                <Form.Control.Feedback type="invalid">{formErrors.sobrenome}</Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                    </div>

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

                    <Form.Group className="mb-4" controlId="formPhone">
                        <FloatingLabel controlId="floatingInput" label="Telefone" className="mb-3">
                            <Form.Control type="tel" name="telefone" placeholder="Insira seu número de telefone." value={formData.telefone} isInvalid={!!formErrors.telefone} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">{formErrors.telefone}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <div className="mb-2">
                        <FloatingLabel controlId="floatingInput" label="Logradouro" className="mb-3">
                            <Form.Control type="text" name="logradouro" placeholder="Logradouro" value={formData.logradouro} isInvalid={!!formErrors.logradouro} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">{formErrors.logradouro}</Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-flex">
                            <div style={{ marginRight: '20px' }}>
                                <FloatingLabel controlId="floatingInput" label="Número" className="mb-3">
                                    <Form.Control type="text" name="numero" placeholder="Número" value={formData.numero} isInvalid={!!formErrors.numero} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">{formErrors.numero}</Form.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel controlId="floatingInput" label="CEP" className="mb-3">
                                    <Form.Control type="text" name="cep" placeholder="CEP" value={formData.cep} isInvalid={!!formErrors.cep} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">{formErrors.cep}</Form.Control.Feedback>
                                </FloatingLabel>
                            </div>
                        </div>

                    <FloatingLabel controlId="floatingInput" label="Complemento" className="mb-3">
                        <Form.Control type="text" name="complemento" placeholder="Complemento" value={formData.complemento} isInvalid={!!formErrors.complemento} onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{formErrors.complemento}</Form.Control.Feedback>
                    </FloatingLabel>

                        <div className="d-flex">
                            <div style={{ marginRight: '20px' }}>
                                <FloatingLabel controlId="floatingInput" label="Bairro" className="mb-3">
                                    <Form.Control type="text" name="bairro" placeholder="Bairro" value={formData.bairro} isInvalid={!!formErrors.bairro} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">{formErrors.bairro}</Form.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div>
                                <FloatingLabel controlId="floatingInput" label="Cidade" className="mb-3">
                                    <Form.Control type="text" name="cidade" placeholder="Cidade" value={formData.cidade} isInvalid={!!formErrors.cidade} onChange={handleChange} required/>
                                    <Form.Control.Feedback type="invalid">{formErrors.cidade}</Form.Control.Feedback>
                                </FloatingLabel>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-center mb-4">Data de Cadastro: {getDateFromUnix(formData.data)}</p>
                    </div>

                    <div className="text-center">
                        <Button variant="success" type="submit" className="btn-block mb-4">Alterar</Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Conta;