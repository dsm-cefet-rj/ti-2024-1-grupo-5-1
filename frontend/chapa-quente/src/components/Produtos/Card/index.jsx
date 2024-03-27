import style from "./Card.module.css"
import hamburguer_img from "../../../assets/img/hamburguer.png"

const Card = ({ item }) => {
    return (
        <>
            <div className={`card h-100 ${style.cardSize}`}>
                <img src={item.src} className={`card-img-top ${style.cardImgSize}`} alt="..." />
                <div className="card-body">
                    <h5 className={`card-title ${style.cardSize}`}>{item.nome}</h5>
                    <p className={`card-text ${style.cropText}`}>{item.desc}</p>
                </div>
                <div className="card-footer">
                    <a href="#" className="btn btn-primary">Add</a>
                </div>
            </div>
        </>
    )
}

export default Card