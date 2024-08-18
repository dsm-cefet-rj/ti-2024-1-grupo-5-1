import axios from "axios";

const API_URL = "http://localhost:3001";

const register = async (user) => {
    return await axios.post(`${API_URL}/usuarios/register`, user)
        .catch((error) => {
            return error.response;
        })
};


const login = async (email, senha) => {
    return await axios.post(`${API_URL}/usuarios/login`, { email, senha })
        .then((response) => {
            console.log('found', response.data);
            localStorage.setItem("user", response.data);
            return response.data;
        })
        .catch((error) => {
            return error.response;
        })
}


const update = async (user) => {
    const response = await axios.patch(`${API_URL}/usuarios/update/`, user);
    return response.data;
};

const fetchOne = async (userId) => {
    const response = await axios.get(`${API_URL}/usuarios/${userId}`);
    return response.data;
};

const fetchMany = async () => {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
}

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    update,
    fetchOne,
    fetchMany,
    login,
    logout
};

export default authService;