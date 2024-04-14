import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button'

import Form from './ProdutosForm'
import SelecionaProduto from './SelecionaProduto';
import CardPreview from './CardPreview';
import { useState } from 'react';

const ProdutosForm = () => {

    const [pageState, setPageState] = useState('create')

    return (
        <>
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <Row className='w-75 mb-4'>
                    <Stack className="mt-2" direction='horizontal'>
                        <Button variant='outline-success' className='mx-auto' onClick={() => setPageState('create')}>Adicionar Produto</Button>
                        <Button variant='outline-warning' className='mx-auto' onClick={() => setPageState('update/delete')}>Alterar/Deletar Produto</Button>
                    </Stack>
                </Row>
                {
                    pageState === 'update/delete' ?
                        <>
                            <Row className='w-25 mb-2'>
                                <SelecionaProduto />
                            </Row>
                            <Row className='w-75 justify-content-center'>
                                <CardPreview />
                                <Form state={pageState} />
                            </Row>
                        </> : pageState === 'create' ?
                            <>
                                <Row className='w-75 justify-content-center'>
                                    <CardPreview />
                                    <Form state={pageState} />
                                </Row>
                            </>
                            : null
                }
            </Container>
        </>
    )
}

export default ProdutosForm