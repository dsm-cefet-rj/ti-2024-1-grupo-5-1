import axios from "axios";
import API_URL from "./APIUrl";

const register = async (user) => {
    const response = await axios.post(`${API_URL}/usuarios/register`, user);
    return response.data;
};


const login = async (user) => {
    const response = await axios.post(`${API_URL}/usuarios/login`, user)

    if (response.data) {
        const { token, user } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        return response.data;
    } else {
        return null;
    }
}

const update = async (user) => {
    const response = await axios.patch(`${API_URL}/usuarios/update/`, user,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    );
    
    if (response.data) {
        const { token, user } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        return response.data;
    } else {
        return null;
    }
};

const remove = async (userId) => {
    const response = await axios.post(`${API_URL}/usuarios/delete`, userId,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    );
    return response.data;
};

const fetchOne = async (userId) => {
    const response = await axios.get(`${API_URL}/usuarios/fetch/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    );
    return response.data;
};

const fetchMany = async () => {
    const response = await axios.get(`${API_URL}/usuarios/fetch/`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    );
    return response.data;
}

const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
};

const authService = {
    register,
    update,
    fetchOne,
    fetchMany,
    login,
    logout,
    remove
};

export default authService;