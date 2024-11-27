import axios from "axios";

const API = import.meta.env.VITE_API;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API}/products`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API}/products/${id}`);
  return response.data.data;
};

export const createProduct = async (newProduct) => {
  try {
    const response = await axios.post(`${API}/products`, newProduct);
    return response.data.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API}/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API}/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
