import style from "./Card.module.css"
import "bootstrap-icons/font/bootstrap-icons.css";

import { addItem, removeItem } from "../../../redux/carrinhoSlice";
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
                    <button className="btn btn-primary" onClick={() => handleRemoveItem(item)}>-</button>
                    <button className="btn btn-primary" onClick={() => handleAddItem(item)}>+</button>
                    <div className="btn btn-primary">{`R$ ${item.price}`}</div>
                </div>
            </div>
        </>
    )
}

export default Card