import 'bootstrap/dist/css/bootstrap.css';
import './pedido.css'
import Table from 'react-bootstrap/Table';
import * as Icon from 'react-bootstrap-icons'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function TabelaPedidos() {

    const [exibirCaixaDeTexto, setExibirCaixaDeTexto] = useState(false);
  const [quantidadeTroco, setQuantidadeTroco] = useState('');

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
  return (
    <div>
    <p>Checkout de Pedidos</p>
    <Table striped bordered hover className='tabela'>
      <thead>
        <tr>
          <th>ID Pedido</th>
          <th>Pedido</th>
          <th>Quantidade</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Hamburguer duplo cheddar</td>
          <td>x1</td>
          <td>R$ 16,00</td>
        </tr>
        <tr>
            <td>2</td>
          <td>Hamburguer de frango</td>
          <td>x1</td>
          <td>R$ 15,00</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Batata média</td>
          <td>x1</td>
          <td>R$ 8,00</td>
        </tr>
      </tbody>
    </Table>
            <p>Total: </p>
    <div className='formaPagamento'>
    <h2>Forma de Pagamento</h2>
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
                
                <Button type='submit' variant="warning">Confirmar</Button>{' '}
                
    </div>
    </div>
  );
}

export default TabelaPedidos;