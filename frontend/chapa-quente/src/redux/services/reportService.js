import axios from "axios";

const API_URL = "http://localhost:3001";

const fetchVendasPorTempo = async () => {
    try {
        const response = await axios.get(`${API_URL}/pedidos`);
        return { data: response.data };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar vendas por tempo");
    }
};

const fetchClientesFidelizados = async () => {
    try {
        const response = await axios.get(`${API_URL}/pedidos`);
        return { data: response };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar clientes fidelizados");
    }
};

const fetchProdutosMaisVendidos = async () => {
    try {
        const response = await axios.get(`${API_URL}/pedidos`);
        return { data: response };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar produtos mais vendidos");
    }
};


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
    fetchClientesFidelizados,
    fetchProdutosMaisVendidos,
    fetchVendasPorTempo,
    fetchAgendamentos,
    fetchAvaliacoes,
    fetchPedidos
};

export default reportService;
