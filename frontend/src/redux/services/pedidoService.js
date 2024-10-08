import axios from "axios";
import API_URL from "./APIUrl";

const register = async (pedido) => {
    return await axios.post(`${API_URL}/pedidos`, pedido,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
        .catch((error) => {
            return error.response;
        }
    );
};

const fetchFromUser = async (id) => {
    return await axios.get(`${API_URL}/pedidos?user_id=${id}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
        .catch((error) => {
            return error.response;
        }
    );
};

const fetchFromOrder = async (id) => {
    return await axios.get(`${API_URL}/pedidos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
        .catch((error) => {
            return error.response;
        }
    );
}

const rate = async (id, rating) => {
    return await axios.patch(`${API_URL}/pedidos/${id}`, { avaliacao: rating },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
        .catch((error) => {
            return error.response;
        }
    );
}

const updateStatus = async (id, _status) => {
    return await axios.patch(`${API_URL}/pedidos/${id}`, { status : _status },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    )
        .catch((error) => {
            return error.response;
        }
    );
}

const pedidoService = {
    register,
    fetchFromUser,
    fetchFromOrder,
    rate,
    updateStatus
};

export default pedidoService;