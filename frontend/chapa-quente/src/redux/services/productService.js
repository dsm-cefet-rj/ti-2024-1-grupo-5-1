import axios from "axios";

const API_URL = "http://localhost:3004";

const fetchProduto = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/produtos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar produto");
    }
}

const fetchProdutos = async () => {
    try {
        const response = await axios.get(`${API_URL}/produtos`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar produtos");
    }
}

const productService = {
    fetchProdutos,
    fetchProduto
};

export default productService;