import axios from "axios";

const API = import.meta.env.VITE_API;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API}/categories`);
    return response.data.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
