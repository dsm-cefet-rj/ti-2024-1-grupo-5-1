import Form from 'react-bootstrap/Form'

import { updateFormField, copyDataFromProduto } from '../../../redux/reducers/managerSlice';
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { selectAllProdutos, fetchProdutos, selectProduto } from '../../../redux/reducers/produtosSlice';
import Stack from 'react-bootstrap/Stack';

const SelecionaProduto = () => {
    const dispatch = useDispatch();
    const produtos = useSelector(selectAllProdutos);
    const produtosStatus = useSelector(state => state.produtos.status)
    const [selectedID, setSelectedID] = useState(null)
    const selectedProduto = useSelector((state => selectProduto(state, selectedID)))

    useEffect(() => {
        if (produtosStatus === 'idle') {
            dispatch(fetchProdutos())
        }
    }, [produtosStatus, dispatch])

    useEffect(() => {
        if (selectedID !== null) {
            dispatch(copyDataFromProduto(selectedProduto));
        }
    }, [selectedID, selectedProduto, dispatch]);

    const handleProdutoChange = (e) => {
        setSelectedID(e.target.value)
        dispatch(copyDataFromProduto(selectedProduto))
    };

    return (
        <>
            <Form.Select onChange={handleProdutoChange}>
                <option>{produtosStatus !== 'succeeded' ? 'Carregando Produtos': 'Selecione um Produto'}</option>
                {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>{`#${produto.id} ${produto.nome}`}</option>
                ))}
            </Form.Select>
        </>
    )
}

export default SelecionaProduto