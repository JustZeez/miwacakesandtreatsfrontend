import axios from "axios";

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = "https://miwacakesandtreatsbackend-1.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers["x-admin-password"] = token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      const currentPath = window.location.pathname;
      if (currentPath.startsWith("/admin") && !currentPath.includes("/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

// ✅ 1. ORDER API - For customers (YOUR UNAVAILABLE PRODUCTS PAGE NEEDS THIS!)
export const orderAPI = {
  createOrder: (formData) => {
    return api.post("/orders", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  trackOrder: (orderId, phone) => {
    console.log("Tracking order:", { orderId, phone });
    const encodedOrderId = encodeURIComponent(orderId);
    return api.get(`/orders/track/${encodedOrderId}`, {
      params: { phone: phone },
    });
  },

  getOrderDetails: (orderId) =>
    api.get(`/orders/${encodeURIComponent(orderId)}`),

  // ✅ THIS IS WHAT YOUR COMING SOON PAGE NEEDS!
  getProducts: (queryParams = '') => {
    return api.get(`/products${queryParams}`);
  },
};

// ✅ 2. ADMIN API - For admin dashboard
export const adminAPI = {
  getDashboardStats: () => api.get("/admin/dashboard-stats"),
  getAllOrders: () => api.get("/admin/orders"),
  updateOrderStatus: (orderId, status) =>
    api.patch(`/admin/orders/${orderId}/status`, { status }),
  deleteOrder: (orderId) => api.delete(`/admin/orders/${orderId}`),
  getProducts: () => api.get("/products"),
  createProduct: (productData) =>
    api.post("/admin/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteProduct: (productId) => api.delete(`/admin/products/${productId}`),
  login: (password) => api.post("/admin/login", { password }),
  logout: () => {
    localStorage.removeItem("adminToken");
  },
};

export default api;