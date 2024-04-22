import 'bootstrap/dist/css/bootstrap.css';
import './pedido.css'
import Table from 'react-bootstrap/Table';
import * as Icon from 'react-bootstrap-icons'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'; // Importar Container corretamente
import Row from 'react-bootstrap/Row'; // Importar Row corretamente
import Col from 'react-bootstrap/Col'; // Importar Col corretamentez
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCaixaTexto, setQuantidadeTroco} from '../../redux/reducers/pedidoSlice';
import { addItem, removeItem } from '../../redux/reducers/carrinhoSlice';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/reducers/authSlice'; // Importa o selector para obter o usuário atual
import Agendamentos from '../Agendamento';
import { validate } from "../../utils/scheduleFormValidation";
import scheduleService from '../../redux/services/scheduleSlice';


const Carrinho = () => {
  const dispatch = useDispatch();
  const carrinho = useSelector(state => state.carrinho.itens);
  const currentUser = useSelector(selectCurrentUser); // Obtenha o usuário atual do Redux Store
  const userId = currentUser ? currentUser.id : null; // Obter o ID do usuário
  const [exibirCaixaDeTexto, setExibirCaixaDeTexto] = useState(false);
  const quantidadeTroco = useSelector(state => state.pedido.quantidadeTroco);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate(); // Para redirecionar o usuário

  const [dataMarcada, setDataMarcada] = useState({
    data: '',
    hora: '',
  });

  
  const handleChangeAgendamento = (e) => {
    const { name, value } = e.currentTarget;
        setDataMarcada({ ...dataMarcada, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
  };

  

  const confirmarPedido = async (e) => {

    function gerarIdNumerico(minimo, maximo) {
      return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    }

    const minimo = 1000000; 
    const maximo = 9999999; 

    const idPedido = gerarIdNumerico(minimo,maximo);

    const carrinhoSemSrc = carrinho.map(({ quantity, src, ...resto }) => ({
      ...resto,
    qtd: quantity,
  }));
    

    const novoPedido = {
      id: idPedido,  
      user_id: userId,
      produtos: carrinhoSemSrc,  
      total: calcularPrecoTotal(), 
      pagamento: formaPagamento,
      status: 'Em andamento',
      detalhes: detalhesPedido,
      qtdTroco: quantidadeTroco,
      avaliacao: '',
      date_pedido: '',
      date_agendada: '',
    };
    e.preventDefault();

    if (carrinho.length === 0) {
      toast(`Erro: Carrinho vazio!`, {type : 'error'});
      return;
    }

    if (!userId) {
      console.error('Usuário não logado');
      setShowErrorToast(true); // Mostre um erro se não houver usuário
      return;
    }

        try {
            const hora_marcada = validate(dataMarcada);
            novoPedido.date_agendada = hora_marcada;
            novoPedido.date_pedido = Math.floor(Date.now() / 1000);
            await scheduleService.schedule(novoPedido)
            .then(() => {
              console.log('agendado')
                toast('Agendamento efetuado com sucesso!', { type: 'success' });
            })
        } catch (error) {
            if (error.errors) {
                setFormErrors(error.errors);
            } else {
              console.log('Erro ao agendar')
                toast(`Erro ao agendar: ${error.message}`, { type: "error" });
            }
        }

    
   

    try {
      const response = await axios.post('http://localhost:3001/pedidos', novoPedido);

      // Se a criação do pedido for bem-sucedida, redirecione para o status do pedido
      navigate(`/statusPedido/${response.data.id}`); // Redireciona para a página do pedido usando o ID do pedido
    } catch (error) {
      console.error('Erro ao confirmar o pedido:', error);
      setShowErrorToast(true); // Se houver erro, mostre um aviso de erro
    }
  };


  
  useEffect(() => {
    console.log("Pedidos mudaram:", carrinho);
  }, [carrinho]);

    
   const handleAddQuantity = (id) => {
    dispatch(addItem({ id }));
   };
   
  const handleRemoveQuantity = (id) => {
    dispatch(removeItem({ id }));
  };

  const [formaPagamento, setFormaPagamento] = useState('Pix');
  const [detalhesPedido, setDetalhesPedido] = useState('');
  
  const handleChangeFormaPagamento = (event) => {
   
    console.log('Novo valor:', event.target.value);
    setFormaPagamento(event.target.value);
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
      <div className='formaDePagamento'>
        <h2 className='textoPagamento'>Forma de Pagamento</h2>
        <form action="#">
          <label htmlFor="opcao1">
            <input type="radio" id="opcao1" name="formaPagamento" value="Pix" onChange={handleChangeFormaPagamento} checked={formaPagamento == 'Pix'}/>
            <Icon.UpcScan width={35} height={25}/> Pix
          </label>
          <br/>
          <label htmlFor="opcao2">
            <input type="radio" id="opcao2" name="formaPagamento" value="Cartao" onChange={handleChangeFormaPagamento} checked={formaPagamento == 'Cartao'}/>
            <Icon.CreditCard width={35} height={25}/> Cartão (crédito ou débito)
          </label>
          <br/>
          <label htmlFor="opcao3" >
            <input type="radio" id="opcao3" name="formaPagamento" value="Dinheiro" onChange={handleChangeFormaPagamento} checked={formaPagamento == 'Dinheiro'}/>
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
            <div>
            <Form.Label style={{fontWeight: 'bold', fontSize: 20, marginTop: 15}}>Detalhes do Pedido</Form.Label>
            <Form.Control
              as="textarea"
              value={detalhesPedido}
              onChange={(e) => setDetalhesPedido(e.target.value)}
              placeholder="Insira detalhes adicionais do pedido..."
              rows={3}
            />
          </div>

          <Row style={{ marginTop: 10 }}>
        <Col>
        <Agendamentos
        data={dataMarcada.data}
        hora={dataMarcada.hora}
        handleChange={handleChangeAgendamento} // Passar função para atualizar o estado de agendamento
        formErrors={formErrors}
      />

        </Col>
      </Row>
          <Container>
            <Row className="justify-content-center" style={{marginTop: 40}}>
              <Col md="auto">
                <Button type='submit' variant="warning" className="mx-2 btn-lg w-auto" onClick={confirmarPedido} as={Link} to ="/statusPedido/:usersid">Confirmar</Button>
                <Button className="mx-2 btn-lg w-auto" variant="warning" as={Link} to="/produtos">Voltar ao Cardápio</Button>
              
          <ToastContainer position="top-end">
        <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} autohide delay={3000}>
          <Toast.Header>
            <strong className="me-auto">Erro</strong>
          </Toast.Header>
          <Toast.Body>O carrinho está vazio. Adicione itens antes de confirmar.</Toast.Body>
        </Toast>
      </ToastContainer>

              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </div>
  );
}

export default Carrinho;

