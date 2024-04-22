import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import icon from '../../assets/img/icon.png';
import { useEffect, useState } from 'react';

const Header = () => {
    const [userData, setUserData] = useState({});
    const [state, setState] = useState(false);
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        setState(isLoggedIn);
        setUserData(user);
    }, [isLoggedIn]);

  return (
    <>
      <Navbar className="bg-body-tertiary" bg="primary" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/">
                <img src={icon} alt="Chapa Quente" width="30" height="30" className="d-inline-block align-top" />
                <span className="ms-2">Chapa Quente</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/produtos">Cardápio</Nav.Link>
                <Nav.Link href="/contato">Contato</Nav.Link>
            </Nav>
            {state ? (
                <>
                    <Nav>
                        <NavDropdown title={`Olá, ${userData.nome}!`} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/agendamentos">Agendamentos</NavDropdown.Item>
                            <NavDropdown.Item href="/pedidos/usersid">Pedidos</NavDropdown.Item>
                            <NavDropdown.Item href="/conta">Conta</NavDropdown.Item>{
                                userData.role === 'admin' ? (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/ativos">Pedidos Ativos</NavDropdown.Item>
                                        <NavDropdown.Item href="/relatorios">Relatórios</NavDropdown.Item>
                                    </>
                                ) : null
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </>
            ):(
                <>
                    <Nav>
                        <Nav.Link href="/cadastro">Cadastro</Nav.Link>
                        <Button href="/login" variant="outline-light" className="me-2">Login</Button>
                    </Nav>
                </> 
            )}
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;