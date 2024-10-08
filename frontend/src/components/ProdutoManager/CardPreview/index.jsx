import style from "./CardPreview.module.css"
import NotFound from "../../../assets/img/NotFound.png";

const CardPreview = ({ formData, imagePreview }) => {
    const imageSrc = imagePreview 
    ? imagePreview : formData.src 
        ? `http://localhost:3001/uploads/${formData.src}`
        : NotFound;

    return (
        <>
            <div className={`card h-100 ${style.cardSize}`}>
                <img src={imageSrc} className={`card-img-top ${style.cardImgSize}`} alt="..." />
                <div className="card-body">
                    <h5 className={`card-title ${style.cardSize}`}>{formData.nome}</h5>
                    <p className={`card-text ${style.cropText}`}>{formData.desc}</p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <div className="btn btn-primary" disabled>
                        {formData.price ? `R$ ${parseFloat(formData.price).toFixed(2)}` : 'R$ --,--'}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardPreview;
