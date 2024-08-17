import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies with requests
});

// Add your API key here
const apiKey = import.meta.env.VITE_API_KEY;

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add the API key to the headers
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }

    return config;
  },
  (error) => {
    // Handle request error here
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data, // Directly return response data
  (error) => {
    // Handle response errors here
    if (error.response) {
      console.error('Response error:', error.response);
      if (error.response.status === 401) {
        console.log('Unauthorized, redirecting to login...');
        // Handle unauthorized access, e.g., redirect to login
      } else if (error.response.status === 500) {
        console.error('Server error:', error.response.data.message);
      }
    } else if (error.request) {
        console.log(error)
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API call object with methods for GET, POST, PATCH, PUT
const apiCall = {
  get: (url, params) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  patch: (url, data) => api.patch(url, data),
  put: (url, data) => api.put(url, data),
};

export { apiCall };
// export default api;
