import Table from 'react-bootstrap/Table';

import { useNavigate } from 'react-router-dom';
import { removeProduto } from '../../../redux/reducers/produtosSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
 
const ProdutoTable = ({produtos}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleEdit = (id) => {
        navigate(`/produtosmanager/edit/${id}`);
    }

    const handleDelete = (id) => {
        toast(`Deletando produto ${id}`, {type: 'info'})
        dispatch(removeProduto(id)).then(() => {
            toast(`Produto ${id} deletado`, { type: 'success' });
        }).catch(error => {
            toast(`Erro ao deletar produto ${id}: ${error}`, { type: 'error' });
        });
    }

    return (
        <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                        <th>desc</th>
                        <th>price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtos && produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.desc}</td>
                            <td>{produto.price}</td>
                            <td>
                                <button onClick={() => handleEdit(produto.id)}>Editar</button>
                                <button onClick={() => handleDelete(produto.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </Table>
    )
}

export default ProdutoTable;