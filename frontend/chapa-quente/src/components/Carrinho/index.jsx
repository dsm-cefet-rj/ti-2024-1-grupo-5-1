import { PlusCircleFill, DashCircleFill, UpcScan, CreditCard, CashCoin } from 'react-bootstrap-icons';
import { Form, Row, Col, Button, Table, FloatingLabel } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './pedido.css';

import { validateSchedule, mustSchedule } from "../../utils/checkoutFormValidation";
import { addItem, removeItem } from '../../redux/reducers/carrinhoSlice';
import { register } from '../../redux/reducers/pedidoSlice';

const Carrinho = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { itens } = useSelector(state => state.carrinho);
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const [displayAgendamento, setDisplayAgendamento] = useState(false);
  const [exibirCaixaDeTexto, setExibirCaixaDeTexto] = useState(false);

  const [formData, setFormData] = useState({
    user_id: user.id,
    produtos: itens.map(({ quantity, src, ...resto }) => ({
      ...resto,
      qtd: quantity,
    })),
    total: itens.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2),
    detalhes: '',
    pagamento: 'Pix',
    status: 'Em andamento',
    qtdTroco: '',
    avaliacao: '',
    date_pedido: '',
    date_agendada: '',
  });

  const [dataMarcada, setDataMarcada] = useState({
    data: '',
    hora: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChangeAgendamento = (e) => {
    const { name, value } = e.currentTarget;
    setDataMarcada({ ...dataMarcada, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      toast('Você precisa estar logado para acessar o carrinho!', { type: 'error' });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const mustAgendar = mustSchedule();
    if (mustAgendar) {
      const dataFormatada = mustAgendar.toISOString().split('T')[0];
      const horaFormatada = mustAgendar.getHours().toString().padStart(2, '0') + ":00";
      setDataMarcada({ hora: horaFormatada, data: dataFormatada });
      setDisplayAgendamento(true);
      toast('O restaurante está fechado, por favor agende seu pedido.', { type: 'info' });
    }
  }, []);

  const handleSubmitPedido = async (e) => {
    e.preventDefault();

    if (itens.length === 0) {
      toast(`Erro: Carrinho vazio!`, { type: 'error' });
      return;
    }

    const pedidoData = {
      ...formData,
      date_pedido: Math.floor(Date.now() / 1000),
    };

    if (displayAgendamento) {
      try {
        const hora_marcada = validateSchedule(dataMarcada);
        pedidoData.date_agendada = hora_marcada;
        dispatch(register(pedidoData)).then(() => {
          toast('Agendamento efetuado com sucesso!', { type: 'success' });
        });
      } catch (error) {
        if (error.errors) {
          setFormErrors(error.errors);
        } else {
          toast(`Erro ao agendar: ${error.message}`, { type: 'error' });
        }
      }
    } else {
      try {
        dispatch(register(pedidoData)).then((data) => {
          console.log(data.payload.id)
          navigate(`/pedidos/${data.payload.id}`);//aqui
          toast('Pedido efetuado com sucesso!', { type: 'success' });
        });
      } catch (error) {
        console.error('Erro ao confirmar o pedido:', error);
        toast(`Erro ao confirmar o pedido: ${error.message}`, { type: 'error' });
      }
    }
  };

  const handleAddQuantity = (id) => {
    dispatch(addItem({ id }));
  };

  const handleRemoveQuantity = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleChangeFormaPagamento = (e) => {
    const { value } = e.currentTarget;
    setFormData({ ...formData, pagamento: value });
    if (value === 'Dinheiro') {
      setExibirCaixaDeTexto(true);
    } else {
      setExibirCaixaDeTexto(false);
    }
  };

  const handleChangeDetalhes = (e) => {
    const { value } = e.currentTarget;
    setFormData({ ...formData, detalhes: value });
  };

  const calcularPrecoTotal = () => {
    let total = 0;
    itens.forEach(produto => {
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
          {itens.map((produto, index) => (
            <tr key={index}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.quantity}</td>
              <td>R$ {parseFloat(produto.price).toFixed(2)}</td>
              <td>R$ {(parseFloat(produto.price * produto.quantity)).toFixed(2)}</td>
              <td>
                <div className='button-container'>
                  <Button variant="success" onClick={() => handleAddQuantity(produto.id)}>
                    <PlusCircleFill />
                  </Button>
                  <Button variant="danger" onClick={() => handleRemoveQuantity(produto.id)}>
                    <DashCircleFill />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className='precoTotal'>Total: R$ {calcularPrecoTotal()}</p>
      <Form onSubmit={handleSubmitPedido}>
        <h2 className='textoPagamento'>Forma de Pagamento</h2>
        <Form.Group>
          <Form.Check
            type="radio"
            id="opcao1"
            label={<><UpcScan width={35} height={25} /> Pix</>}
            name="pagamento"
            value="Pix"
            checked={formData.pagamento === 'Pix'}
            onChange={handleChangeFormaPagamento}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="radio"
            id="opcao2"
            label={<><CreditCard width={35} height={25} /> Cartão (Crédito ou Débito)</>}
            name="pagamento"
            value="Cartao"
            checked={formData.pagamento === 'Cartao'}
            onChange={handleChangeFormaPagamento}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="radio"
            id="opcao3"
            label={<><CashCoin width={35} height={25} /> Dinheiro</>}
            name="pagamento"
            value="Dinheiro"
            checked={formData.pagamento === 'Dinheiro'}
            onChange={handleChangeFormaPagamento}
          />
        </Form.Group>
        {exibirCaixaDeTexto && (
          <Form.Group>
            <Form.Label>Quantidade de troco necessária:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Quantidade de troco"
              value={formData.qtdTroco}
              onChange={(e) => setFormData({ ...formData, qtdTroco: e.target.value })}
              name="qtdTroco"
            />
          </Form.Group>
        )}
        {displayAgendamento && (
          <>
            <FloatingLabel controlId="floatingInput" label="Data" className="mb-3">
              <Form.Control
                type="date"
                placeholder="data"
                name="data"
                value={dataMarcada.data}
                onChange={handleChangeAgendamento}
                isInvalid={!!formErrors.data}
                required
              />
              <Form.Control.Feedback type="invalid">{formErrors.data}</Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Hora" className="mb-3">
              <Form.Control
                type="time"
                placeholder="hora"
                name="hora"
                value={dataMarcada.hora}
                onChange={handleChangeAgendamento}
                isInvalid={!!formErrors.hora}
                step="3600"
                pattern="(?:[01]\d|2[0123]):(?:[012345]\d)"
                required
              />
              <Form.Control.Feedback type="invalid">{formErrors.hora}</Form.Control.Feedback>
            </FloatingLabel>
          </>
        )}
        <Form.Label style={{ fontWeight: 'bold', fontSize: 20, marginTop: 15 }}>Detalhes do Pedido</Form.Label>
        <Form.Control
          as="textarea"
          value={formData.detalhes}
          onChange={handleChangeDetalhes}
          placeholder="Insira detalhes adicionais do pedido..."
          rows={3}
        />
        <Button variant="primary" type="submit" className="w-100">
          {displayAgendamento ? 'Agendar' : 'Confirmar Pedido'}
        </Button>
        {!displayAgendamento && (
          <Button variant="secondary" className="w-100 mt-2" as={Link} to="/produtos">
            Voltar ao Cardápio
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Carrinho;
