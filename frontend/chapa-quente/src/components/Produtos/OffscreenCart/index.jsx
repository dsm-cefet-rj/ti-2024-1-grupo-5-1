import { BasketFill, TrashFill, CartFill, DashCircleFill } from "react-bootstrap-icons"
import { Button, ListGroup, Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useState } from 'react';
import { Link } from "react-router-dom";


import { removeItem, clearCart } from '../../../redux/reducers/carrinhoSlice';

const OffscreenCart = () => {

    const { itens } = useSelector((state) => state.carrinho);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handleRemoveFromCart = (e) => {
        dispatch(removeItem(e));
        toast("Item removido do carrinho.", { type: "success", autoClose: 2000 });
    }

    const handleEmptyCart = () => {
        dispatch(clearCart());
        toast("Carrinho esvaziado.", { type: "success", autoClose: 2000 });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '100' }}>
                <BasketFill style={{ fontSize: '60px'}}/>
                <br></br>{itens.reduce((acc, item) => acc + item.quantity, 0)}
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrinho</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {itens.length === 0 ? (
                        <>
                            <p>Seu carrinho está vazio.</p>
                        </>
                    ) : (
                        <>
                            <ListGroup>
                                {itens.map((item) => (
                                <ListGroup.Item key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 style={{ fontWeight: 'bold' }}>{item.nome}</h5>
                                        <p style={{ marginBottom: '0.5rem' }}>Quantidade: {item.quantity}</p>
                                        <p style={{ marginBottom: '0.5rem' }}>Preço: R$ {item.price}</p>
                                    </div>
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(item)} style={{ marginLeft: '20px' }}>
                                    <DashCircleFill style={{ fontSize: '20px'}}/>
                                    </Button>
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '5px' }}>
                                Total: R$ {itens.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                            </div>
                            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <Link to='/carrinho'>
                                <Button variant="success" style={{ marginTop: '5px' }}>
                                        <CartFill style={{ fontSize: '20px'}}/> Efetuar Pagamento
                                </Button>
                                </Link>
                                <Button variant="danger" onClick={handleEmptyCart} style={{ marginTop: '5px', marginLeft: '10px' }}>
                                        <TrashFill style={{ fontSize: '20px'}}/> Esvaziar Carrinho
                                </Button>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default OffscreenCart;