import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderAPI = {
  
  createOrder: (formData) => {
    return api.post('/orders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  
  getOrderDetails: (orderId) => {
    return api.get(`/orders/${orderId}`);
  },
};

export default api;