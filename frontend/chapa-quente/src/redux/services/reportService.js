import axios from "axios";

const API_URL = "http://localhost:3001";


const fetchPedidos = async () => {
    try {
        const response = await axios.get(`${API_URL}/pedidos`);
        return { data: response.data };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar pedidos cancelados");
    }
};

const fetchAvaliacoes = async () => {
    try {
        const response = await axios.get(`${API_URL}/rating`);
        return { data: response.data };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar avaliações");
    }
};

const fetchAgendamentos = async () => {
    try {
        const response = await axios.get(`${API_URL}/agendamentos`);
        return { data: response.data };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar agendamentos");
    }
};

const reportService = {
    fetchAgendamentos,
    fetchAvaliacoes,
    fetchPedidos
};

export default reportService;
