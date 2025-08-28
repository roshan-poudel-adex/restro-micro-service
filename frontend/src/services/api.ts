import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => api.post('/auth/register', userData),
  
  getProfile: () => api.get('/auth/me'),
  
  logout: () => api.post('/auth/logout'),
};

// Menu API
export const menuAPI = {
  getMenuItems: (params?: {
    category?: string;
    isActive?: boolean;
    isVegetarian?: boolean;
  }) => api.get('/menu', { params }),
  
  getMenuItem: (id: string) => api.get(`/menu/${id}`),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    type: 'PICKUP' | 'DELIVERY';
    items: Array<{
      menuItemId: string;
      quantity: number;
      notes?: string;
    }>;
    address?: string;
    notes?: string;
  }) => api.post('/orders', orderData),
  
  getOrders: (params?: {
    status?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) => api.get('/orders', { params }),
  
  getOrder: (id: string) => api.get(`/orders/${id}`),
};

// Reviews API
export const reviewsAPI = {
  getReviews: (params?: {
    status?: string;
    platform?: string;
  }) => api.get('/reviews', { params }),
  
  createReview: (reviewData: {
    rating: number;
    comment: string;
    platform?: string;
  }) => api.post('/reviews', reviewData),
};

// Analytics API (for frontend dashboard if needed)
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getRevenue: (params?: {
    period?: string;
    days?: number;
  }) => api.get('/analytics/revenue', { params }),
  getCustomers: () => api.get('/analytics/customers'),
};