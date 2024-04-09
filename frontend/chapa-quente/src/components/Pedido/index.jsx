import 'bootstrap/dist/css/bootstrap.css';
import './pedido.css'
import Table from 'react-bootstrap/Table';
import * as Icon from 'react-bootstrap-icons'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'; // Importar Container corretamente
import Row from 'react-bootstrap/Row'; // Importar Row corretamente
import Col from 'react-bootstrap/Col'; // Importar Col corretamentez
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCaixaTexto, setQuantidadeTroco} from '../../redux/reducers/pedidoSlice';
import { addItem, removeItem } from '../../redux/reducers/carrinhoSlice';



const Pedidos = () => {
  const dispatch = useDispatch();
  const carrinho = useSelector(state => state.carrinho.itens);
  const produtos = useSelector(state => state.tabela.produtos);
  const [exibirCaixaDeTexto, setExibirCaixaDeTexto] = useState(false);
  const quantidadeTroco = useSelector(state => state.pedido.quantidadeTroco);
  const quantidades = useSelector(state => state.pedido.quantidades);

  useEffect(() => {
    console.log("Pedidos mudaram:", carrinho);
    // Lógica relacionada à atualização dos pedidos, se necessário
  }, [carrinho]);

   const handleAddQuantity = (id) => {
    dispatch(addItem({ id }));
   };

  const handleRemoveQuantity = (id) => {
    dispatch(removeItem({ id }));
  };
  
  const handleChangeFormaPagamento = (event) => {
    if (event.target.value === 'Dinheiro') {
      setExibirCaixaDeTexto(true);
      dispatch(toggleCaixaTexto());
    } else {
      setExibirCaixaDeTexto(false);
      dispatch(setQuantidadeTroco(''));
    }
  };

  const handleChangeQuantidadeTroco = (event) => {
    dispatch(setQuantidadeTroco(event.target.value));
  };

  const calcularPrecoTotal = () => {
    let total = 0;
    carrinho.forEach(produto => {
            total += parseFloat(produto.quantity) * parseFloat(produto.price);
    });
    return total.toFixed(2);
};

  return (
    <div>
      <p>Checkout de Pedidos</p>
      <Table striped bordered hover variant='dark' className='tabela'>
        <thead>
          <tr>
            <th>ID Produto</th>
            <th>Pedido</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Preço Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((produto, index) => (
            <tr key={index}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantity}</td>
              <td>R$ {parseFloat(produto.price).toFixed(2)}</td>
              <td>R$ {(parseFloat(produto.price * produto.quantity)).toFixed(2)}</td>
              <td>
                <div className='button-container'>
                  <Button variant="success" onClick={() => handleAddQuantity(produto.id)}>
                    <Icon.PlusCircleFill />
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveQuantity(produto.id)}>
                    <Icon.DashCircleFill />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className='precoTotal'>Total: R$ {calcularPrecoTotal()}</p>
      <div className='formaPagamento'>
        <h2 className='textoPagamento'>Forma de Pagamento</h2>
        <form action="#">
          <label htmlFor="opcao1">
            <input type="radio" id="opcao1" name="formaDePagamento" value="Pix" onChange={handleChangeFormaPagamento}/>
            <Icon.UpcScan width={35} height={25}/> Pix
          </label>
          <br/>
          <label htmlFor="opcao2">
            <input type="radio" id="opcao2" name="formaDePagamento" value="Cartao" onChange={handleChangeFormaPagamento}/>
            <Icon.CreditCard width={35} height={25}/> Cartão (crédito ou débito)
          </label>
          <br/>
          <label htmlFor="opcao3">
            <input type="radio" id="opcao3" name="formaDePagamento" value="Dinheiro" onChange={handleChangeFormaPagamento}/>
            <Icon.CashCoin width={35} height={25}/> Dinheiro
          </label>
          <br/>
          {exibirCaixaDeTexto && (
            <div>
              <label>
                Quantidade de troco necessária:
                <input type="text" value={quantidadeTroco} onChange={handleChangeQuantidadeTroco} />
              </label>
            </div>
          )}
          <Container>
            <Row className="justify-content-center">
              <Col md="auto">
                <Button type='submit' variant="warning" className="mx-2 btn-lg w-auto" as={Link} to="/agendamento">Confirmar</Button>
                <Button className="mx-2 btn-lg w-auto" variant="warning" as={Link} to="/produtos">Voltar ao Cardápio</Button>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </div>
  );
}

export default Pedidos;
