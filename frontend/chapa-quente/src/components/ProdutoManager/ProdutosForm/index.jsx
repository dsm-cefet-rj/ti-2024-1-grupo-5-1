import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import { useParams } from 'react-router-dom';
import { imgToBase64 } from '../../../util/imgToBase64'
import { alteraProduto, fetchProduto, selectProduto, addProduto } from '../../../redux/reducers/produtosSlice';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

import CardPreview from "../CardPreview"

const ProdutosForm = ({ isEditing }) => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: id,
        nome: '',
        desc: '',
        src: null,
        price: ''
    })

    const produtosStatus = useSelector(state => state.produtos.status)
    const produto = useSelector((state) => selectProduto(state, id))

    useEffect(() => {
        if (!isEditing) {
            return;
        }

        if (!produto) {
            dispatch(fetchProduto(id));
        } else {
            setFormData({
                id: produto.id,
                nome: produto.nome,
                desc: produto.desc,
                src: produto.src,
                price: produto.price
            });
        }

    }, [dispatch, id, isEditing, produto, produtosStatus]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            toast(`Alterando produto ${id}`, { type: 'info' })
            dispatch(alteraProduto(formData)).then(() => {
                toast(`Produto ${id} alterado`, { type: 'success' });
            }).catch(error => {
                toast(`Erro ao alterar produto ${id}: ${error}`, { type: 'error' });
            });
        } else {
            toast(`Adicionando produto`, { type: 'info' })
            dispatch(addProduto(formData)).then(() => {
                toast(`Produto Adicionado`, { type: 'success' });
            }).catch(error => {
                toast(`Erro ao adicionar ${id}: ${error}`, { type: 'error' });
            });;
        }
    };

    const handleInputChange = async (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: await imgToBase64(files[0])
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    return (
        <>
            <Stack className="justify-content-center" direction="horizontal" gap={3}>
                <CardPreview formData={formData} />
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Nome do Produto" className="mb-2">
                                    <Form.Control name='nome' type="text" defaultValue={isEditing ? formData.nome : ''} onChange={handleInputChange} ></Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Preço" className="mb-2">
                                    <Form.Control name='price' type='number' min="0.00" step="0.01" defaultValue={isEditing ? formData.price : ''} onChange={handleInputChange}></Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel label="Descrição">
                                    <Form.Control name='desc' as="textarea" rows={3} className='mb-2' defaultValue={isEditing ? formData.desc : ''} onChange={handleInputChange}></Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FormLabel className='mb-0'>Insira uma imagem</FormLabel>
                                <Form.Control name='src' type="file" accept="image/*" onChange={handleInputChange}></Form.Control>
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