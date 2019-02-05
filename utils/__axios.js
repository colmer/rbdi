import axios from 'axios';
import isNode from 'detect-node';
import cookie from 'js-cookie';

const isBrowser = !isNode;

axios.defaults.baseURL = process.env.API;

export class Axios {
  constructor(options = {}) {
    this.client = options.client || axios.create();
    this.token = options.token || null;
    this.refreshToken = options.refreshToken || null;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        this.token = isBrowser ? cookie.get('token') : this.token;
        if (!this.token) return config;

        const newConfig = {
          headers: {},
          ...config,
        };

        newConfig.headers.Authorization = `Bearer ${this.token}`;

        return newConfig;
      },
      e => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        this.refreshToken = isBrowser ? cookie.get('refreshToken') : this.refreshToken;

        if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
          if (error.response.status === 403) this.deleteTokens();
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post('/auth/refresh', {
            refreshToken: this.refreshToken,
          });
        }

        const { data } = await this.refreshRequest;
        this.refreshRequest = null;

        this.setTokens(data);
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      },
    );

    this.setTokens = (data = {}) => {
      if (isBrowser && data.token && data.refreshToken) {
        cookie.set('token', data.token);
        cookie.set('refreshToken', data.refreshToken);
      }
      this.token = data.token || null;
      this.refreshToken = data.refreshToken || null;
    };

    this.getTokens = () => {
      return {
        token: isBrowser ? cookie.get('token') : this.token,
        refreshToken: isBrowser ? cookie.get('refreshToken') : this.token,
      };
    };

    this.deleteTokens = () => {
      if (isBrowser) {
        cookie.remove('token');
        cookie.remove('refreshToken');
      }
      this.token = null;
      this.refreshToken = null;
    };
  }
}

export default new Axios();
