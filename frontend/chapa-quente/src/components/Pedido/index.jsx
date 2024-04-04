import 'bootstrap/dist/css/bootstrap.css';
import './pedido.css'
import Table from 'react-bootstrap/Table';
import * as Icon from 'react-bootstrap-icons'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom/';
import { useSelector } from "react-redux";


const Pedidos = () => {

  const pedidos = useSelector(state => state.carrinho.itens)

  const [exibirCaixaDeTexto, setExibirCaixaDeTexto] = useState(false);
  const [quantidadeTroco, setQuantidadeTroco] = useState('');
  const [quantidades, setQuantidades] = useState({});

  useEffect(() => {
    console.log("Pedidos mudaram:", pedidos);
    const consolidated = {};
    pedidos.forEach(pedido => {
        if (consolidated[pedido.id]) {
            consolidated[pedido.id].quantity += 1;
        } else {
            consolidated[pedido.id] = { ...pedido, quantity: 1 };
        }
    });
    setQuantidades(consolidated);
}, [pedidos]);

const handleAddQuantity = (id) => {
  setQuantidades(prevQuantidades => ({
      ...prevQuantidades,
      [id]: { ...prevQuantidades[id], quantity: prevQuantidades[id].quantity + 1 }
  }));
};

const handleRemoveQuantity = (id) => {
  if (quantidades[id].quantity > 1) {
      setQuantidades(prevQuantidades => ({
          ...prevQuantidades,
          [id]: { ...prevQuantidades[id], quantity: prevQuantidades[id].quantity - 1 }
      }));
  } else {
      // Se a quantidade for 1, remove o produto completamente
      const newQuantities = { ...quantidades };
      delete newQuantities[id];
      setQuantidades(newQuantities);
  }
};
  
  const handleChangeFormaPagamento = (event) => {
    if (event.target.value === 'Dinheiro') {
      setExibirCaixaDeTexto(true);
    } else {
      setExibirCaixaDeTexto(false);
    }
  };

  const handleChangeQuantidadeTroco = (event) => {
    setQuantidadeTroco(event.target.value);
  };

  const calcularPrecoTotal = () => {
    let total = 0;
    Object.values(quantidades).forEach(pedido => {
        total += pedido.quantity * parseFloat(pedido.price);
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
      {Object.values(quantidades).map((pedido, index) => (
        
                        <tr key={index}>
                            <td>{pedido.id}</td>
                            <td>{pedido.nome}</td>
                            <td>{pedido.quantity}</td> {}
                            <td>R$ {parseFloat(pedido.price).toFixed(2)}</td>
                            <td>R$ {(parseFloat(pedido.price) * pedido.quantity).toFixed(2)}</td>
                            <td>
                              <div className='button-container'>
                                <Button variant="success" onClick={() => handleAddQuantity(pedido.id)}>
                                    <Icon.PlusCircleFill />
                                </Button>
                                <Button variant="danger"  onClick={() => handleRemoveQuantity(pedido.id)}>
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
            <form action="#"/>
                <label for="opcao1"/>
                <input type="radio" id="opcao1" name="formaDePagamento" value="Pix" onChange={handleChangeFormaPagamento}/>
                <Icon.UpcScan width={35} height={25}/> Pix
                <br/>
                
                <label for="opcao2"/>
                <input type="radio" id="opcao2" name="formaDePagamento" value="Cartao" onChange={handleChangeFormaPagamento}/>
                <Icon.CreditCard width={35} height={25}/> Cartão (crédito ou débito)
                <br/>
                

                <label for="opcao3"/>
                <input type="radio" id="opcao3" name="formaDePagamento" value="Dinheiro" onChange={handleChangeFormaPagamento}/>
                <Icon.CashCoin width={35} height={25}/> Dinheiro
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
          <Button type='submit' variant="warning" className="mx-2 btn-lg w-auto">Confirmar</Button>
          <Button className="mx-2 btn-lg w-auto" variant="warning" as={Link} to="/produtos">Voltar ao Cardápio</Button>
        </Col>
      </Row>
    </Container>
                
    </div>
    </div>
  );
}

export default Pedidos;