import axios from 'axios';

const API_URL = 'http://localhost:3001/produtos';

const fetchProdutos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const fetchProduto = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

const addProduto = async (produtoData) => {
    console.log(produtoData);
    const response = await axios.post(API_URL, produtoData,
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
    const response = await axios.patch(`${API_URL}/${produtoId}`, produtoData,
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
    const response = await axios.delete(`${API_URL}/${produtoId}`,
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