import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
 import { toast } from "react-toastify";
 import { register } from "../../redux/reducers/authSlice";
 import axios from "axios";


function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(false);
  const [hour, setHour] = useState("");
  const [houseNumber, setNumber] = useState("");
  const [local, setLocal] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [data, setDate] = useState("");


  const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      dispatch(
        register({
          name,
          surname,
          houseNumber,
          local,
          bairro,
          cep,
          complemento,
          hour,
        })
      );
    } catch (error) {
      console.error(error);
    }
    
    function gerarIdNumerico(minimo, maximo) {
      return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    }

    const minimo = 1000000; 
    const maximo = 9999999; 

    const idAgendamento = gerarIdNumerico(minimo,maximo);
      const novoAgendamento = {
      id: idAgendamento,  
      nome: name,
      sobrenome: surname,
      local_entrega: local,
      numero: houseNumber,
      cep: cep,
      bairro: bairro,
      complemento: complemento,
      hora: hour,
      data_entrega: data,


    };

    axios.post('http://localhost:4000/agendamento', novoAgendamento) 
    .then(response => {
      console.log('Agendamento confirmado:', response.data);  
      setShowConfirmationToast(true);
    })
    .catch(error => {
      console.error('Erro ao confirmar o endereço:', error);  
    });

    
    
  };
  
  const dia = new Date();
  const data1 = dia.getDate() + 1;
  const data2 = dia.getDate() + 2;
  const mes = dia.getMonth();
  const ano = dia.getFullYear();
  
  // const inputName = document.querySelector(name);

  // inputName.addEventListener("keypress", function (e) {
  //   const keyCode = e.keyCode ? e.keyCode : e.wich;

  //   if (keyCode > 47 && keyCode < 58) {
  //     e.preventDefault();
  //   }
  // });

  // document.querySelector('input[tupe="number"]').forEach(input => {
  //   input.oniput = () => {
  //     if(input.value.lenght > input.maxLenght) input.value = input.value.slice(0, input.maxLenght)
  //   }
  // })

  return (
    <>
      <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "90px" }}>
        <h2 className="text-center mb-4" style={{ marginBottom: "20px" }}>
          Endereço para a entrega
        </h2>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <div className="d-flex">
            <div style={{ marginRight: "20px" }}>
              <FloatingLabel
                controlId="floatingInput"
                id="name"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder= "name"
                  value={name}
                  onChange={(e) => {
                    const input = e.target.value;
                    const onlyLetters = input.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                    setName(onlyLetters); 
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Insira um nome.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Sobrenome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Sobrenome"
                  id="surname"
                  value={surname}
                  onChange={(e) => {
                    const input = e.target.value;
                    const onlyLetters = input.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                    setSurname(onlyLetters); 
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o sobrenome.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>
          </div>

          <div className="mb-2">
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Logradouro"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Logradouro"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o logradouro.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>
            <Form.Group className="d-flex" controlId="formNumberHouse">
              <div style={{ marginRight: "20px" }}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Número"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    min={1}
                    placeholder="Informe o número da sua casa"
                    value={houseNumber}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Insira um número válido.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
               <FloatingLabel
                controlId="floatingInput"
                label="CEP"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  id="cep"
                  placeholder="Informe o CEP"
                  value={cep}
                  onChange={(e) => {
                    const input = e.target.value;
                    const onlyNumbers = input.replace(/\D/g, '');
                    setCep(onlyNumbers);
                  }}
                  pattern="[0-9]{8}"
                  maxLength="8" 
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Insira um CEP válido.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group> 
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Bairro"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => {
                    const input = e.target.value;
                    const onlyLettersAndSpaces = input.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
                    setBairro(onlyLettersAndSpaces); 
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe o Bairro.
                </Form.Control.Feedback>
              </FloatingLabel>
              <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Complemento"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value) && handleInput}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
          {/* <p>
            Escolha entre os próximos 2 dias para sua entrega:
            <br />
            (Opcional)
          </p>

          <Form.Group className="mb-2 d-flex gap-2" controlId="checkDates">
            {tomorrow === true ? (
              ""
            ) : (
              <Form.Check
                type="checkbox"
                label={data1 + "/" + mes + "/" + ano}
                id="checkTomorrow"
                name = "dia"
                checked={today}
                onClick={() => setToday(!today)}
              />
            )}
            {today === true ? (
              ""
            ) : (
              <Form.Check
                type="checkbox"
                label={data2 + "/" + mes + "/" + ano}
                name = "dia"
                id="checkTomorrow"
                checked={ tomorrow}
                onClick={() => setTomorrow(!tomorrow)}
              />
            )}
            <Form.Control.Feedback type="invalid">
              É necessário escolher uma data de entrega!!
            </Form.Control.Feedback>
          </Form.Group>

          {today === true ? (
            <>
              <Form.Control
                className="mb-2"
                type="time"
                min={"14:00"}
                max={"22:00"}
                placeholder="Horário:"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                required
              />
              <p>Horario de funcionamento de 14:00 as 22:00</p>
            </>
          ) : (
            ""
          )}*/}
          <div>
              <FloatingLabel
                    controlId="floatingInput"
                    label="Data"
                    className="mb-3"
                  >
                    <Form.Control
                      type="Date"
                      placeholder="data"
                      name="data"
                      value={data}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Informe a data.
                    </Form.Control.Feedback>
              </FloatingLabel>
              <Form.Control
                type="time"
                min={"14:00"}
                max={"22:00"}
                placeholder="Horário:"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                required
                />
              <p>Hórario de funcionamento de 14:00 as 22:00</p>
            
         </div>
          <div className="text-center">
            <Button variant="primary" type="submit" className="btn-block mb-4">
              Confirmar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
