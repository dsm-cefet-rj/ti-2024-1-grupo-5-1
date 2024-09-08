import { useEffect } from "react";
import { fetchProdutos, selectAllProdutos, } from "../../redux/reducers/produtosSlice";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProdutoTable from "./ProdutoTable";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ProdutoManager = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()

    const produtosStatus = useSelector(state => state.produtos.status)
    const produtos = useSelector(selectAllProdutos)
    useEffect(() => {
        if (produtosStatus === 'idle') {
            dispatch(fetchProdutos())
        }
    }, [produtos])

    const handleCreateClick = () => {
        navigator('/produtosmanager/new')
    }

    return (
        <>
            <Container className="container justify-content-center" style={{marginTop: '30px', maxWidth: '50vw'}}>
                <Row className="justify-content-end mb-3">
                    <Button variant="success" style={{maxWidth: '100px'}} onClick={handleCreateClick}>Novo +</Button>
                </Row>
                <Row>
                    {produtos.length > 0 ? <ProdutoTable produtos={produtos} /> : <h4 style={{textAlign: 'center'}}>Nenhum produto encontrado! Clique em Novo para adicionar!</h4>}
                </Row>
            </Container>

        </>
    )
}


export default ProdutoManager