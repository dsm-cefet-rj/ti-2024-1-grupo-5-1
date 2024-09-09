import axios from 'axios';
import API_URL from "./APIUrl";

const fetchProdutos = async () => {
    const response = await axios.get(`${API_URL}/produtos`);
    return response.data;
};

const fetchProduto = async (id) => {
    const response = await axios.get(`${API_URL}/produtos/${id}`);
    return response.data;
};

const addProduto = async (produtoData) => {
    const response = await axios.post(`${API_URL}/produtos`, produtoData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

const alteraProduto = async (produtoId, produtoData) => {
    const response = await axios.patch(`${API_URL}/produtos/${produtoId}`, produtoData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

const removeProduto = async (produtoId) => {
    const response = await axios.delete(`${API_URL}/produtos/${produtoId}`,
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

const productService = {
    fetchProdutos,
    fetchProduto,
    addProduto,
    alteraProduto,
    removeProduto
};

export default productService;