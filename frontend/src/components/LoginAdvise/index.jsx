import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function LoginAdvise({ showModal, handleClose }) {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ainda não...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Interessado em algum de nossos produtos? Faça login e comece a adicionar itens ao seu carrinho!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose} href="/login">
                    Fazer Login
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginAdvise;