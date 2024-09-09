import axios from "axios";
import API_URL from "./APIUrl";

const fetchPedidos = async () => {
    try {
        const response = await axios.get(`${API_URL}/pedidos/ativos`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
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