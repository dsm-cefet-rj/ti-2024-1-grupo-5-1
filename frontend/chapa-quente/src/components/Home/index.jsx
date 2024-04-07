import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import logo from '/src/assets/img/icon.png'

function Home() {
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
            <div class="container col-xxl-8 px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <img src={logo} class="d-block mx-lg-auto img-fluid" alt="Chapa Quente Logo" width="700" height="700" loading="lazy"/>
                </div>
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-3">Chapa Quente</h1>
                    <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor orci quis justo viverra, non scelerisque elit scelerisque. Nullam eros purus, interdum at massa non, dapibus elementum lectus. Praesent venenatis velit et suscipit finibus. Proin risus nisl, sollicitudin nec bibendum sit amet, hendrerit ac tortor.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    {state ?
                    (
                        <>
                            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2" onClick={() => handleButtonClick('/produtos')}>Menu</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={() => handleButtonClick('/pedidos')}>Pedidos</button>
                        </>
                    ):(
                    <>
                            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2" onClick={() => handleButtonClick('/login')}>Login</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={() => handleButtonClick('/cadastro')}>Cadastro</button>
                    </>
                    )}
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default Home;