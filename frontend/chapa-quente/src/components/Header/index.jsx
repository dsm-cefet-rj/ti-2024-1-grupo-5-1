import 'bootstrap/dist/css/bootstrap.css';
import logo from '/src/assets/img/icon.png'
import './header.css'

function Header() {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg sticky-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top"></img>
                            Chapa Quente
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav ">
                                <a className="nav-link active" aria-current="page" href="#">Página Inicial</a>
                                <a className="nav-link" href="#">Sobre</a>
                                <a className="nav-link" href="#">Contato</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}


export default Header;