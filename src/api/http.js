import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 10000
});

// 你可以在这里加请求/响应拦截器
http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default http;