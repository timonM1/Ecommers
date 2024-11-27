import axios from "axios";

const API = import.meta.env.VITE_API;

export const createOrder = async (clientId, cartItems) => {
  try {
    const response = await axios.post(`${API}/order`, {
      clientId,
      cartItems,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
