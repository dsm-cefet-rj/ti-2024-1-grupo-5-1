import { useNavigate } from "react-router-dom";

import logo from '../../assets/img/logo.png';

const Inicio = ({isLoggedIn}) => {

    const navigate = useNavigate();
    const handleButtonClick = (url) => {
        navigate(url);
    };

    return (
        <>
            <div className="container col-xxl-8 px-4 py-5" style={{ marginTop: '45px' }}>
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={logo} className="d-block mx-lg-auto img-fluid" width="700" height="700" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Bem-vindo! :)</h1>
                        <p className="lead">Aqui é onde a tradição encontra o sabor e a qualidade. Preparamos nossos hambúrgueres com o maior cuidado e apenas com ingredientes frescos e locais para garantir que você obtenha o melhor em cada mordida. Venha e experimente o sabor autêntico do hambúrguer feito com muito amor e carinho!</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            {isLoggedIn ?
                                (
                                    <>
                                        <button type="button" className="btn btn-success btn-lg px-4 me-md-2" onClick={() => handleButtonClick('/produtos')}>Cardápio</button>
                                        <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => handleButtonClick('/pedidos')}>Pedidos</button>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className="btn btn-success btn-lg px-4 me-md-2" onClick={() => handleButtonClick('/produtos')}>Cardápio</button>
                                        <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => handleButtonClick('/login')}>Login</button>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inicio;