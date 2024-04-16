import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/img/logo.png';

function Inicio() {
    const [state, setState] = useState(false);

    const authState = useSelector((state) => state.auth);
    useEffect(() => {
        setState(authState.isLoggedIn);
    }, [authState.isLoggedIn]);

    const navigate = useNavigate();
    const handleButtonClick = (url) => {
        navigate(url);
      };

    return (
        <>
            <div class="container col-xxl-8 px-4 py-5" style={{ marginTop: '45px' }}>
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <img src={logo} class="d-block mx-lg-auto img-fluid" width="700" height="700" loading="lazy"/>
                </div>
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-3">Bem-vindo! :)</h1>
                    <p class="lead">Aqui é onde a tradição encontra o sabor e a qualidade. Preparamos nossos hambúrgueres com o maior cuidado e apenas com ingredientes frescos e locais para garantir que você obtenha o melhor em cada mordida. Venha e experimente o sabor autêntico do hambúrguer feito com muito amor e carinho!</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    {state ?
                    (
                        <>
                            <button type="button" class="btn btn-success btn-lg px-4 me-md-2" onClick={() => handleButtonClick('/produtos')}>Cardápio</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={() => handleButtonClick('/pedidos')}>Pedidos</button>
                        </>
                    ):(
                    <>
                            <button type="button" class="btn btn-success btn-lg px-4 me-md-2" onClick={() => handleButtonClick('/produtos')}>Cardápio</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={() => handleButtonClick('/login')}>Login</button>
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