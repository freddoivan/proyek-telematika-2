import { QueryFunction } from '@tanstack/react-query';
import axios from 'axios';

/** Add NEXT_PUBLIC_MOCK_DEPLOYMENT_URL to your production deployment on vercel! */
const baseURL = process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL
? `https://${process.env.NEXT_PUBLIC_MOCK_DEPLOYMENT_URL}/api/mock`
: process.env.NEXT_PUBLIC_VERCEL_URL
? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
: 'http://localhost:5000/';

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
