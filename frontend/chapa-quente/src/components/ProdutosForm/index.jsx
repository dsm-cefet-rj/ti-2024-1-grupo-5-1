import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack';

import { imgToBase64 } from '../../util/imgToBase64'
import { useDispatch } from 'react-redux';
import { addProduto } from '../../redux/reducers/produtosSlice';
import { produtosSchema } from '../../validations/produtosSchema';
import { useState } from 'react';

const ProdutosForm = () => {
    const dispatch = useDispatch()
    const [imgPreview, setImgPreview] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = {
            nome: e.target[0].value,
            price: parseFloat(e.target[1].value),
            desc: e.target[2].value,
            src: await imgToBase64(e.target[3].files[0]),
        }
        const isValid = await produtosSchema.isValid(formData)
        if (isValid) {
            dispatch(addProduto(formData))
        }
        console.log(isValid)
        console.log(formData)
    }

    const handleImg = async (e) => {
        const { name, value, files } = e.target;
        const file = files[0]
        setImgPreview(await imgToBase64(file));
    }

    return (
        <>
            <Container>
                <Stack className="d-flex justify-content-center align-items-center vh-100">
                    {imgPreview && <img src={imgPreview} alt="Preview" />}
                    <Form noValidate className='w-50' onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <FloatingLabel label="Nome do Produto" className="mb-2">
                                        <Form.Control type="text"></Form.Control>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <FloatingLabel label="Preço" className="mb-2">
                                        <Form.Control type='number' min="0.00" step="0.01"></Form.Control>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <FloatingLabel label="Descrição">
                                        <Form.Control as="textarea" rows={3} className='mb-2'></Form.Control>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <FormLabel className='mb-0'>Insira uma imagem</FormLabel>
                                    <Form.Control type="file" onChange={handleImg} accept="image/*"></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Stack className="mt-2" direction='horizontal'>
                                <Button variant='outline-success' type="submit" className='mx-auto'>Adicionar Produto</Button>
                                <Button variant='outline-warning' type="submit" className='mx-auto'>Alterar Produto</Button>
                                <Button variant='outline-danger' type="submit" className='mx-auto'>Deletar Produto</Button>
                            </Stack>
                        </Row>
                    </Form>
                </Stack>
            </Container>
        </>
    )
}

export default ProdutosForm