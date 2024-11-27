import axios from "axios";

const API = import.meta.env.VITE_API;

export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${API}/client/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
