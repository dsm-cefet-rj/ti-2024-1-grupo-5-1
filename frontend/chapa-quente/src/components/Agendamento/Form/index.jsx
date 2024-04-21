import "bootstrap/dist/css/bootstrap.css";
import "./form.css";

function Form() {
  return (
    <form>
      <div>
        <label for="exampleInputNome">Nome:</label>
        <input type="email" class="form-control" id="exampleInputEmail1" />
      </div>

      <div>
        <label for="exampleInputEndereco">Endereço:</label>
        <input type="email" class="form-control" id="exampleInputEmail1" />
      </div>

      <div class="">
        <label for="Data">Data</label>
        <input type="date" class="form-control"/>
      </div>
      <div class="">
        <label for="Horario">Horário:</label>
        <input type="time" min="14:00" max="22:00" class="form-control" required />
        <p id="aviso">Horário de funcionamento de 14:00 às 22:00</p>
      </div>

      <button type="submit" class="btn btn-danger ">
        Confirmar
      </button>
    </form>
  );
}

export default Form;