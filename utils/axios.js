import axios from 'axios';
import cookie from 'js-cookie';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

axios.defaults.baseURL = process.env.API;

let request = null;

axios.interceptors.request.use(
  config => {
    const token = cookie.get('token');

    if (!token) return config;

    const newConfig = {
      headers: {},
      ...config,
    };

    newConfig.headers.Authorization = `Bearer ${token}`;
    return newConfig;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  r => r,
  async err => {
    const res = err.response || {};
    const refreshToken = cookie.get('refreshToken');

    if (!refreshToken || res.status !== 401 || err.config.retry) {
      throw err;
    }

    if (!request) {
      request = axios.post('/auth/refresh', {
        refreshToken: cookie.get('refreshToken'),
      });
    }

    const { data } = await request;
    request = null;

    cookie.set('token', data.token);
    cookie.set('refreshToken', data.refreshToken);

    const newRequest = {
      ...err.config,
      retry: true,
    };

    return axios.request(newRequest);
  },
);

export default axios;
