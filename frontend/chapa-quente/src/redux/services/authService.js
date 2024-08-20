import axios from "axios";

const API_URL = "http://localhost:3001";

const register = async (user) => {
    const response = await axios.post(`${API_URL}/usuarios/register`, user);
    return response.data;
};


const login = async (user) => {
    const response = await axios.post(`${API_URL}/usuarios/login`, user)

    if (response.data) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return response.data;
    } else {
        return null;
    }
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
    localStorage.removeItem("token");
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