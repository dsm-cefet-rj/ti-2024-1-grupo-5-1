import "bootstrap/dist/css/bootstrap.css";
import "./agendamento.css";
import Form from "./Form";

function Agendamento() {
  return (
    <article class="position-absolute top-50 start-50 translate-middle">
      <h2>Detalhes do Pedido:</h2>

      <Form />
    </article>
  );
}

export default Agendamento;
