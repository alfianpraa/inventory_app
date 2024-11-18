import axios from 'axios';

const API_URL = "http://localhost/your-codeigniter-folder/index.php/inventorycontroller";

export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (product) => axios.post(`${API_URL}/addProduct`, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/updateProduct/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/deleteProduct/${id}`);
