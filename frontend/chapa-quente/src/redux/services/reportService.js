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

const reportService = {
    fetchPedidos
};

export default reportService;