import Stack from 'react-bootstrap/Stack';
import style from "./Card.module.css"
import { Plus, Dash } from 'react-bootstrap-icons';
import "bootstrap-icons/font/bootstrap-icons.css";

import { addItem, removeItem } from "../../../redux/reducers/carrinhoSlice";
import { useDispatch } from "react-redux";

const Card = ({ item }) => {
    const dispatch = useDispatch()
    const handleAddItem = () => {
        dispatch(addItem(item))
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
        </>
    )
}

export default Card