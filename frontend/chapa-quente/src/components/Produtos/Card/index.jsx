import Stack from 'react-bootstrap/Stack';
import style from "./Card.module.css"
import { Plus, Dash } from 'react-bootstrap-icons';
import "bootstrap-icons/font/bootstrap-icons.css";

import { addItem, removeItem } from "../../../redux/reducers/carrinhoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const Card = ({ item }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleAddItem = () => {
        if (isLoggedIn) {
            dispatch(addItem(item))
        } else {
            handleShowModal();
        }   
    }
    const handleRemoveItem = () => {
        dispatch(removeItem(item))
    }

    return (
        <>
            <div className={`card h-100 ${style.cardSize}`}>
                <img src={item.src} className={`card-img-top ${style.cardImgSize}`} alt="..." />
                <div className="card-body">
                    <h5 className={`card-title ${style.cardSize}`}>{item.nome}</h5>
                    <p className={`card-text ${style.cropText}`}>{item.desc}</p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <Stack direction='horizontal' gap={3}>
                        <button className="btn btn-primary" onClick={() => handleRemoveItem(item)}><Dash/></button>
                        <div>{`R$ ${item.price}`}</div>
                        <button className="btn btn-primary" onClick={() => handleAddItem(item)}><Plus/></button>
                    </Stack>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ainda não...</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Interessado em algum de nossos produtos? Faça login e comece a adicionar itens ao seu carrinho!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleCloseModal} href="/login">
                                Fazer Login
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                </Modal>
        </>
    )
}

export default Card