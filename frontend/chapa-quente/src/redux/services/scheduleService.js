import axios from "axios";

const API_URL = 'http://localhost:3001';

const schedule = async (formData) => {
    const response = await axios.post(`${API_URL}/agendamentos`, formData);
    return response.data;
}

const scheduleService = {
    schedule
}

export default scheduleService;

