import axios from 'axios';

// another way to get the base URL from .env to use environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//const API_BASE_URL = '';

console.log('API_BASE_URL:', API_BASE_URL); // Debug log to check if env var is loaded

// Create an axios instance with the base URL and default headers
// This allows us to make API calls without repeating the base URL each time
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiService = {
  // Get all blogs
  getAllBlogs: async () => {
    try {
      const response = await api.get('/api/blogs');
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Create a new blog post
  createBlog: async (blogData) => {
    try {
      const response = await api.post('/api/blogs', blogData);
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Get a single blog post by ID
  getBlogById: async (id) => {
    try {
      const response = await api.get(`/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },
}

export default apiService;