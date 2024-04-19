import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { register } from "../../redux/reducers/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(false);
  const [afterTomorrow, setAfterTomorrow] = useState(false);
  const [hour, setHour] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
      dispatch(register({ name, surname, email, password, phoneNumber }));
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoggedIn, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/produtos");
    }

    if (status === "success" && isLoggedIn === false) {
      toast("Usuário registrado com sucesso! Redirecionando para o Login...", {
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    if (status === "failed") {
      toast(
        "Ocorreu um erro ao tentar registrar o usuário. Verifique suas credenciais e tente novamente."
      );
    }
  }, [isLoggedIn, navigate, status]);

  const dia = new Date();
  const data1 = dia.getDate() + 1;
  const data2 = dia.getDate() + 2;
  const data3 = dia.getDate() + 3;
  const mes = dia.getMonth();

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
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  type="number"
                  min={1}
                  placeholder="Informe o CEP"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
          <p>
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
                label={data1 + "/" + mes}
                id="checkTomorrow"
                checked={today}
                onClick={() => setToday(!today)}
              />
            )}
            {today === true ? (
              ""
            ) : (
              <Form.Check
                type="checkbox"
                label={data2 + "/" + mes}
                id="checkTomorrow"
                checked={tomorrow}
                onClick={() => setTomorrow(!tomorrow)}
              />
            )}

            <Form.Control.Feedback type="invalid">
              É necessário escolher uma data de entrega!!
            </Form.Control.Feedback>
          </Form.Group>

          {today === true ? (
            <Form.Control
              className="mb-2"
              type="time"
              placeholder="Horário:"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />
          ) : (
            ""
          )}

          {tomorrow === true ? (
            <Form.Control
              className="mb-2"
              type="time"
              placeholder="Horário:"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />
          ) : (
            ""
          )}

          <div className="text-center">
            <Button variant="primary" type="submit" className="btn-block mb-4">
              Concluir
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
