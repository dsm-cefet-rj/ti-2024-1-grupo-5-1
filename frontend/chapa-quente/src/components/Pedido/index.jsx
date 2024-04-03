import { Link } from "react-router-dom";

const Pedido = () => {
    return (
        <>
        <Link to='/produtos'>
            <div>RETORNA PARA PRODUTOS</div>
        </Link>
        <div>TELA DE PEDIDOS</div>
        </>

    )
}

export default Pedido;