import { Form, FloatingLabel, FormLabel, Button, Col, Row, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { alteraProduto, fetchProduto, selectProduto, addProduto } from '../../../redux/reducers/produtosSlice';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

import CardPreview from "../CardPreview"
import { produtosSchema } from '../../../utils/produtosSchema';

const ProdutosForm = ({ isEditing }) => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const [formData, setFormData] = useState({
        nome: '',
        desc: '',
        src: null,
        price: ''
    })

    const [formErrors, setFormErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const produtosStatus = useSelector(state => state.produtos.status)
    const produto = useSelector((state) => selectProduto(state, id))

    useEffect(() => {
        if (!isEditing) {
            return;
        }

        if (!produto) {
            dispatch(fetchProduto(id)).then(() => {
                toast(`Produto ${id} Carregado`, { type: 'success' });
            }).catch(error => {
                toast(`Erro ao carregar produto ${id}: ${error}`, { type: 'error' });
            });
        } else {
            setFormData({
                nome: produto.nome,
                desc: produto.desc,
                src: produto.src,
                price: produto.price
            });
        }

    }, [produto]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await produtosSchema.validate(formData, { abortEarly: false });

            const productData = new FormData();
            productData.append('nome', formData.nome);
            productData.append('desc', formData.desc);
            productData.append('price', formData.price);
            if (formData.src instanceof File) {
                productData.append('src', formData.src);
            }

            if (isEditing) {
                toast(`Alterando produto ${id}`, { type: 'info' })
                dispatch(alteraProduto({produtoId: id, produtoData: productData})).then(() => {
                    toast(`Produto ${id} alterado`, { type: 'success' });
                }).catch(error => {
                    toast(`Erro ao alterar produto ${id}: ${error}`, { type: 'error' });
                });
            } else {
                toast(`Adicionando produto`, { type: 'info' })
                dispatch(addProduto(productData)).then(() => {
                    toast(`Produto Adicionado`, { type: 'success' });
                }).catch(error => {
                    toast(`Erro ao adicionar ${id}: ${error}`, { type: 'error' });
                });
            }
        } catch (error){
            const errors = {};
            error.inner.forEach(err => {
                errors[err.path] = err.message;
            });
            setFormErrors(errors);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            if (name === 'src') {
                const file = files[0];
                setFormData({
                    ...formData,
                    [name]: file
                });
                
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setFormData({
                    ...formData,
                    [name]: files[0]
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    
        setFormErrors({ ...formErrors, [name]: null });
    };

    return (
        <>
            <Stack className="container justify-content-center" direction="horizontal" gap={3} style={{marginTop: '30px', maxWidth: '50vw'}}>
                <CardPreview formData={formData} imagePreview={imagePreview}/>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row> 
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Nome do Produto" className="mb-2">
                                    <Form.Control name='nome' type="text" defaultValue={isEditing ? formData.nome : ''} onChange={handleInputChange} isInvalid={!!formErrors.nome}></Form.Control>
                                    <Form.Control.Feedback type="invalid">{formErrors.nome}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Preço" className="mb-2">
                                    <Form.Control name='price' type='number' min="0.00" step="0.01" defaultValue={isEditing ? formData.price : ''} onChange={handleInputChange} isInvalid={!!formErrors.price}></Form.Control>
                                    <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Descrição">
                                    <Form.Control name='desc' as="textarea" rows={3} className='mb-2' defaultValue={isEditing ? formData.desc : ''} onChange={handleInputChange} isInvalid={!!formErrors.desc}></Form.Control>
                                    <Form.Control.Feedback type="invalid">{formErrors.desc}</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FormLabel className='mb-0'>Insira uma imagem</FormLabel>
                                <Form.Control name='src' type="file" accept="image/*" onChange={handleInputChange} isInvalid={!!formErrors.src}></Form.Control>
                                <Form.Control.Feedback type="invalid">{formErrors.src}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Stack className="mt-2" direction='horizontal'>
                            <Button type='submit'>{isEditing ? "Alterar" : "Criar"}</Button>
                        </Stack>
                    </Row>
                </Form>
            </Stack>
        </>
    )
}

export default ProdutosForm