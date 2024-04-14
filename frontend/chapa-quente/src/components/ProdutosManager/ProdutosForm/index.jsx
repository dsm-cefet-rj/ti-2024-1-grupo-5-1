import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Card from '../CardPreview'

import { updateFormField, resetForm } from '../../../redux/reducers/managerSlice';
import { imgToBase64 } from '../../../util/imgToBase64'
import { useDispatch, useSelector } from 'react-redux';
import { addProduto } from '../../../redux/reducers/produtosSlice';
import { produtosSchema } from '../../../validations/produtosSchema';
import { useState, useEffect } from 'react';

const ProdutosForm = ({ state }) => {
    const dispatch = useDispatch()
    const [imgPreview, setImgPreview] = useState('')
    const [comportamento, setComportamento] = useState(state)
    const formData = useSelector((state) => state.manager.data);

    useEffect(() => {
        dispatch(resetForm())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payloadData = {
            nome: formData.nome,
            price: formData.price,
            src: formData.src,
            desc: formData.desc
        }
        if (comportamento === 'create'){
            const isValid = await produtosSchema.isValid(payloadData)
            if (isValid) {
                dispatch(addProduto(payloadData))
            }
        }else if (comportamento === 'update'){
            const isValid = await produtosSchema.isValid(payloadData)
            if (isValid) {
                //Update one
                dispatch(addProduto(payloadData))
            }
        }else if (comportamento === 'delete'){
            //Delete produto em tela
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(updateFormField({ name, value }));
    };

    const handleImg = async (e) => {
        const { name, value, files } = e.target;
        const file = files[0]
        const imgBase64 = await imgToBase64(file);
        const tempImg = new Image();
        tempImg.onload = () => {
            setImgPreview(imgBase64);
            dispatch(updateFormField({ name, value: imgBase64 }));
        };
        tempImg.src = imgBase64;
    }

    return (
        <>
            <Form noValidate className='w-50' onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Nome do Produto" className="mb-2">
                                <Form.Control name='nome' type="text" onChange={handleChange} value={formData.nome || ''}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Preço" className="mb-2">
                                <Form.Control name='price' type='number' min="0.00" step="0.01" value={formData.price || ''} onChange={handleChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Descrição">
                                <Form.Control name='desc' as="textarea" rows={3} className='mb-2' value={formData.desc || ''} onChange={handleChange}></Form.Control>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FormLabel className='mb-0'>Insira uma imagem</FormLabel>
                            <Form.Control name='src' type="file" onChange={handleImg} accept="image/*"></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Stack className="mt-2" direction='horizontal'>
                        {state === 'create' ? <Button variant='outline-success' type="submit" className='mx-auto'>Criar</Button> :
                            <><Button variant='outline-warning' type="submit" className='mx-auto' onClick={() => setComportamento('update')}>Atualizar</Button>
                                <Button variant='outline-danger' type="submit" className='mx-auto' onClick={() => setComportamento('delete')}>Deletar</Button></>}

                    </Stack>
                </Row>
            </Form>
        </>
    )
}

export default ProdutosForm