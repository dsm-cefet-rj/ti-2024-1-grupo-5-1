import "bootstrap/dist/css/bootstrap.css";
import "./form.css";


function Form() {
  return (
    
<form>
  <div>
    <label for="exampleInputEmail1" >Email:</label>
    <input type="email" class="form-control" id="exampleInputEmail1" />
  </div>

  <div>
    <label for="exampleInputEmail1">Endereço:</label>
    <input type="email" class="form-control" id="exampleInputEmail1" />
  </div>


  <div class="">
    <label for="Data-Agendamento" >Data de retirada:</label>
    <input type="date" class="form-control" />
  </div>

  <button type="submit" class="btn btn-danger ">Confirmar</button>
</form>

  );
}

export default Form;
