import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  withCredentials: true, // đặt true chỉ khi backend đã bật allowCredentials
});

export * from './api';

export default api;
