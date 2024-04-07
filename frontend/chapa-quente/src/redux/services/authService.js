import axios from "axios";

const API_URL = "http://localhost:3001";

const register = async(email, password) => {
    return await axios.post(`${API_URL}/users`, {
        email: email,
        password: password,
        role: 'user'
    }).catch((error) => {
        return error.response;
    });
};

const login = async(email, password) => {
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    if (response.data.length) {
        const user = response.data[0];
        if (user.password === password) {
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }
    }

    return null;
}

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout
};

export default authService;