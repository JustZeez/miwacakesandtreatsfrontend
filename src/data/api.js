import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
// const API_BASE_URL = 'https://miwacakesandtreatsbackend-1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 10000,
});

// REQUEST INTERCEPTOR: Only ONE interceptor needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  
  if (token) {
    // Use BOTH methods for compatibility with your backend auth middleware
    config.headers['x-admin-password'] = token;
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// RESPONSE INTERCEPTOR: Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && !currentPath.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const orderAPI = {
  // Public: Customer creates an order
  createOrder: (formData) => {
    return api.post('/orders', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  trackOrder: (orderId, phone) => 
    api.get(`/orders/track/${orderId}?phone=${phone}`),
  
  // Public/Admin: Get a single order
  getOrderDetails: (orderId) => api.get(`/orders/${orderId}`),
};

export const adminAPI = {
  // 1. Dashboard Stats
  getDashboardStats: () => api.get('/admin/dashboard-stats'),

  // 2. Orders Management
  getAllOrders: () => api.get('/admin/orders'),
  
  updateOrderStatus: (orderId, status) => 
    api.patch(`/admin/orders/${orderId}/status`, { status }),

  deleteOrder: (orderId) => api.delete(`/admin/orders/${orderId}`),

  // 3. Product Management
  getProducts: () => api.get('/products'),
  
  createProduct: (productData) => 
    api.post('/admin/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteProduct: (productId) => api.delete(`/admin/products/${productId}`),

  // 4. Authentication
  login: (password) => api.post('/admin/login', { password }),

  // 5. Optional: Add logout utility
  logout: () => {
    localStorage.removeItem('adminToken');
  }
};

export default api;