import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '/src/assets/img/icon.png'
import './header.css'

function Header() {

    const [state, setState] = useState(false);

    const authState = useSelector((state) => state.auth);
    useEffect(() => {
        setState(authState.isLoggedIn);
    }, [authState.isLoggedIn]);

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src={logo} alt="Logo" width="30" height="30" class="d-inline-block align-text-top"></img>
                        Chapa Quente
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ">
                        <a className="nav-link active" aria-current="page" href="/">Página Inicial</a>
                        {state ?
                            (
                                <>
                                    <a className="nav-link" href="/produtos">Menu</a>
                                    <a className="nav-link" href="/pedidos">Pedidos</a>
                                    <a className="nav-link" href="/logout">Logout</a>
                                </>
                            ):(
                                <>
                                    <a className="nav-link" href="/login">Login</a>
                                    <a className="nav-link" href="/cadastro">Cadastro</a>
                                </>
                            )
                        }
                    </div>
                    </div>
                </div>
            </nav>
        </>
    )
}


export default Header;