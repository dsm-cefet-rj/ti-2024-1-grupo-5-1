import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { register } from "../../redux/reducers/authSlice";
import { validate } from "../../utils/scheduleFormValidation";
import ScheduleService from "../../redux/services/scheduleService";

const Agendamentos = () => {

    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        user_id: user.id,
        produtos: [],
        total: '',
        detalhes: '',
        pagamento: '',
        date_pedido: '',
        date_agendada: '',
    });

    const [dataMarcada, setDataMarcada] = useState({
        hora: '',
        data: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setDataMarcada({ ...dataMarcada, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const hora_marcada = validate(dataMarcada);
            formData.date_agendada = hora_marcada;
            formData.date_pedido = Math.floor(Date.now() / 1000);
            await ScheduleService.schedule(formData)
            .then(() => {
                toast('Agendamento efetuado com sucesso!', { type: 'success' });
            })
        } catch (error) {
            if (error.errors) {
                setFormErrors(error.errors);
            } else {
                toast(`Erro ao agendar: ${error.message}`, { type: "error" });
            }
        }
    };

    return (
        <>
            <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "90px" }}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingInput" label="Data" className="mb-3">
                            <Form.Control type="date" placeholder="data" name="data" value={dataMarcada.data} onChange={handleChange} isInvalid={!!formErrors.data} required/>
                            <Form.Control.Feedback type="invalid">{formErrors.data}</Form.Control.Feedback>
                        </FloatingLabel>
                        
                        <FloatingLabel controlId="floatingInput" label="Hora" className="mb-3">
                            <Form.Control type="time" placeholder="hora" name="hora" value={dataMarcada.hora} onChange={handleChange} isInvalid={!!formErrors.hora} step="3600" pattern="(?:[01]\d|2[0123]):(?:[012345]\d)" required/>
                            <Form.Control.Feedback type="invalid">{formErrors.hora}</Form.Control.Feedback>
                        </FloatingLabel>

                        <Button variant="primary" type="submit" className="w-100">
                            Agendar
                        </Button>
                </Form>
            </div>
        </>
    );
}

export default Agendamentos;
