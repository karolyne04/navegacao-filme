import axios from 'axios';

export const getProducts = async (page: number) => {
  const response = await axios.get(`/api/products?page=${page}`);
  return response.data;
};