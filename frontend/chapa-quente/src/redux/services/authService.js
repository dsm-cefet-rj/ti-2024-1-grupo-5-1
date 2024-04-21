import axios from "axios";

const API_URL = "http://localhost:3001";

const register = async(user) => {
    return await axios.post(`${API_URL}/users`, user)
    .catch((error) => {
        return error.response;
    });
};

const login = async(email, senha) => {
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    if (response.data.length) {
        const user = response.data[0];
        if (user.senha === senha) {
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }
    }

    throw new Error("Usuário ou senha inválidos.");
}

const update = async(user) => {
    localStorage.setItem("user", JSON.stringify(user));
    return await axios.put(`${API_URL}/users/${user.id}`, user)
    .catch((error) => {
        return error.response;
    });
};

const fetchOne = async(userId) => {
    console.log(userId)
    const response = await axios.get(`${API_URL}/users/${userId}`);
    console.log(response.data)
    return response.data;
};

const fetchMany = async() => {
    const response = await axios.get(`${API_URL}/users`);
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