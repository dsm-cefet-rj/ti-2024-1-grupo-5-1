import axios from "axios";

const API_URL = 'http://localhost:3001';

const register = async (pedido) => {
    return await axios.post(`${API_URL}/pedidos`, pedido)
        .catch((error) => {
            return error.response;
        }
    );
};

const fetchFromUser = async (id) => {
    return await axios.get(`${API_URL}/pedidos?user_id=${id}`)
        .catch((error) => {
            return error.response;
        }
    );
};

const fetchFromOrder = async (id) => {
    return await axios.get(`${API_URL}/pedidos/${id}`)
        .catch((error) => {
            return error.response;
        }
    );
}

const rate = async(id, rating) => {
    return await axios.patch(`${API_URL}/pedidos/${id}`, { avaliacao: rating })
        .catch((error) => {
            return error.response;
        }
    );
}

const pedidoService = {
    register,
    fetchFromUser,
    fetchFromOrder,
    rate
};

export default pedidoService;