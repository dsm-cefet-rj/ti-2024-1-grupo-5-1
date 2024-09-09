import axios from "axios";
import API_URL from "./APIUrl";

const schedule = async (formData) => {
    const response = await axios.post(`${API_URL}/agendamentos`, formData);
    return response.data;
}

const scheduleService = {
    schedule
}

export default scheduleService;
