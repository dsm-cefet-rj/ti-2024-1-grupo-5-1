import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux';

import style from "./CardPreview.module.css"

const CardPreview = () => {

    const formData = useSelector((state) => state.manager.data);

    return (
        <>
            <div className={`card h-100 ${style.cardSize}`}>
                <img src={formData.src} className={`card-img-top ${style.cardImgSize}`} alt="..." />
                <div className="card-body">
                    <h5 className={`card-title ${style.cardSize}`}>{formData.nome}</h5>
                    <p className={`card-text ${style.cropText}`}>{formData.desc}</p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <div className="btn btn-primary">{`R$ ${formData.price}`}</div>
                </div>
            </div>
        </>
    )
}

export default CardPreview;


