import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import icon from '../../assets/img/icon.png';

const Header = ({user, isLoggedIn}) => {
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
            {isLoggedIn ? (
                <>
                    <Nav>
                        <NavDropdown title={`Olá, ${user.nome}!`} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>
                            <NavDropdown.Item href="/conta">Conta</NavDropdown.Item>{
                                user.role === 'admin' ? (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/ativos">Pedidos Ativos</NavDropdown.Item>
                                        <NavDropdown.Item href="/produtosmanager">Gerenciar Produtos</NavDropdown.Item>
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
