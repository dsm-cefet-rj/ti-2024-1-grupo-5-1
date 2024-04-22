import axios from "axios";

const API_URL = 'http://localhost:3001';

const register = async (pedido) => {
    return await axios.post(`${API_URL}/pedidos`, pedido)
        .catch((error) => {
            return error.response;
        }
    );
};

const fetch = async (id) => {
    return await axios.get(`${API_URL}/pedidos?user_id=${id}`)
        .catch((error) => {
            return error.response;
        }
    );
};

const pedidoService = {
    register,
    fetch
};

export default pedidoService;