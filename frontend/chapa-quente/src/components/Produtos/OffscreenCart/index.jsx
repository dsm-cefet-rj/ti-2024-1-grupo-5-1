import { BasketFill, TrashFill, CartFill, DashCircleFill } from "react-bootstrap-icons"
import { Button, ListGroup, Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';

import { removeItem, clearCart } from '../../../redux/reducers/carrinhoSlice';

const OffscreenCart = () => {
    const { itens } = useSelector(state => state.carrinho);

    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        toast("Item removido do carrinho!", {type: "success"});
    }

    const handleClearCart = () => {
        dispatch(clearCart());
        toast("Carrinho esvaziado!", {type: "success"});
    }

    useEffect(() => {
        let total = 0;
        itens.forEach((item) => total += parseFloat(item.price))
        setTotal(total.toFixed(2));
    }, [itens])

    return (
        <>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '100' }}>
                <Button variant="primary" onClick={handleShow} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '100' }}>
                    <BasketFill style={{ fontSize: '60px'}}/>
                    <br></br>{itens.length}
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
                                            <p style={{ marginBottom: '0.5rem' }}>Preço: R$ {item.price}</p>
                                        </div>
                                        <Button variant="danger" onClick={() => handleRemoveItem(item)} style={{ marginLeft: '20px' }}>
                                        <DashCircleFill style={{ fontSize: '20px'}}/>
                                        </Button>
                                    </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <div style={{ justifyContent: 'center', display: 'flex', marginTop: '5px' }}>
                                    Total: R$ {total}
                                </div>
                                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                    <Button variant="success" href="/carrinho" style={{ marginTop: '5px' }}>
                                            <CartFill style={{ fontSize: '20px'}}/> Efetuar Pagamento
                                    </Button>
                                    <Button variant="danger" onClick={handleClearCart} style={{ marginTop: '5px', marginLeft: '10px' }}>
                                            <TrashFill style={{ fontSize: '20px'}}/> Esvaziar Carrinho
                                    </Button>
                                </div>
                            </>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default OffscreenCart;