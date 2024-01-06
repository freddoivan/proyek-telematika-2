import { QueryFunction } from '@tanstack/react-query';
import axios from 'axios';

/** Add NEXT_PUBLIC_MOCK_DEPLOYMENT_URL to your production deployment on vercel! */
const baseURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

export const apiMock = axios.create({
  baseURL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  withCredentials: false,
});

apiMock.defaults.withCredentials = false;

apiMock.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

export default apiMock;
