import axios from "axios";

const API_URL = "http://localhost:3001/";

const register = async(user) => {
    const response = await axios.post(API_URL + 'users', user);
    console.log(response.data);
    return response.data;
}

const login = async(user) => {
    const response = await axios.get(`${API_URL}users?email=${user.email}`);
    if (response.data.length === 0) {
        throw new Error("Usuário não encontrado!");
    }

    if (response.data[0].password !== user.password) {
        throw new Error("Usuário ou senha incorretos!");
    }

    const user_data = response.data[0];
    localStorage.setItem("user", user_data.email);
    localStorage.setItem("token", user_data.id);
    localStorage.setItem("role", user_data.role);
    return user_data;
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
}

const authService = {
    register,
    login,
    logout
}

export default authService;