import axios from "axios";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchProducts = async (offset = 0, limit = 10, search = "", category = "") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { offset, limit, search, category },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};