import { useEffect } from "react"
import { fetchProdutos, selectAllProdutos, } from "../../redux/reducers/produtosSlice"
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
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
            <Container>
                <Row className="justify-content-end mb-3">
                    <Button variant="success" style={{maxWidth: '100px'}} onClick={handleCreateClick}>Novo +</Button>
                </Row>
                <Row>
                    <ProdutoTable produtos={produtos} />
                </Row>
            </Container>

        </>
    )
}


export default ProdutoManager