// API utility functions for Flask backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // For cookies/session
      });

      if (!response.ok) {
        const error = await response.text();
        return { error: error || `HTTP error! status: ${response.status}` };
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { data };
      }

      const text = await response.text();
      return { data: text as T };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Flask API endpoints
export const api = {
  // Health check
  health: () => apiClient.get('/api/health'),

  // Auth endpoints (you'll need to create these in Flask)
  login: (username: string, password: string) =>
    apiClient.post('/api/login', { username, password }),

  register: (data: {
    username: string;
    email?: string;
    phone_number?: string;
    password: string;
  }) => apiClient.post('/api/register', data),

  logout: () => apiClient.post('/api/logout'),

  // User endpoints
  getCurrentUser: () => apiClient.get('/api/user/current'),
  updateProfile: (data: any) => apiClient.put('/api/user/profile', data),

  // Camera endpoints
  getCameras: () => apiClient.get('/api/cameras'),
  addCamera: (data: any) => apiClient.post('/api/cameras', data),
  getCamera: (id: number) => apiClient.get(`/api/cameras/${id}`),

  // Statistics endpoints
  getStatistics: () => apiClient.get('/api/statistics'),
  getPostalServices: () => apiClient.get('/api/postal-services'),

  // Users endpoints
  getUsers: () => apiClient.get('/api/users'),

  // Storage endpoints
  getStorageFiles: () => apiClient.get('/api/storage'),
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_BASE_URL}/api/storage/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
  },
};

