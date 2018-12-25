import axios from 'axios';

axios.defaults.baseURL = process.env.API;

export class Axios {
  constructor(options = {}) {
    this.client = options.client || axios.create();
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }

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
        if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post('http://localhost:1337/auth/refresh', {
            refreshToken: this.refreshToken,
          });
        }
        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      },
    );
  }

  setTokens = ({ token, refreshToken }) => {
    this.token = token;
    this.refreshToken = refreshToken;
  };
}

export default new Axios();
