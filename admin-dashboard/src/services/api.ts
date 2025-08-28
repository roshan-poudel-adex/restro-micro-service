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
    const token = localStorage.getItem('admin_token');
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
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  getProfile: () => api.get('/auth/me'),
  
  logout: () => api.post('/auth/logout'),
};

// Users API
export const usersAPI = {
  getUsers: (params?: {
    role?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) => api.get('/users', { params }),
  
  getUser: (id: string) => api.get(`/users/${id}`),
  
  updateUserRole: (id: string, role: string) =>
    api.patch(`/users/${id}/role`, { role }),
  
  updateUserStatus: (id: string, isActive: boolean) =>
    api.patch(`/users/${id}/status`, { isActive }),
};

// Menu API
export const menuAPI = {
  getMenuItems: (params?: {
    category?: string;
    isActive?: boolean;
    isVegetarian?: boolean;
  }) => api.get('/menu', { params }),
  
  getMenuItem: (id: string) => api.get(`/menu/${id}`),
  
  createMenuItem: (data: any) => api.post('/menu', data),
  
  updateMenuItem: (id: string, data: any) => api.put(`/menu/${id}`, data),
  
  deleteMenuItem: (id: string) => api.delete(`/menu/${id}`),
};

// Orders API
export const ordersAPI = {
  getOrders: (params?: {
    status?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) => api.get('/orders', { params }),
  
  getOrder: (id: string) => api.get(`/orders/${id}`),
  
  updateOrderStatus: (id: string, status: string, estimatedTime?: string) =>
    api.patch(`/orders/${id}/status`, { status, estimatedTime }),
};

// Customers API
export const customersAPI = {
  getCustomers: () => api.get('/customers'),
};

// Reviews API
export const reviewsAPI = {
  getReviews: (params?: {
    status?: string;
    platform?: string;
  }) => api.get('/reviews', { params }),
  
  updateReviewStatus: (id: string, status: string) =>
    api.patch(`/reviews/${id}/status`, { status }),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getRevenue: (params?: {
    period?: string;
    days?: number;
  }) => api.get('/analytics/revenue', { params }),
  getCustomers: () => api.get('/analytics/customers'),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};