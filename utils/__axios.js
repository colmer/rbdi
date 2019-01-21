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
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post('/auth/token', {
            refreshToken: this.refreshToken,
          });
        }
        const { data } = await this.refreshRequest;
        this.refreshRequest = null;

        this.setTokens(data)
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      },
    );

    this.setTokens = ({ token, refreshToken }) => {
      console.log('setTokens', refreshToken, token)
      
      if (isBrowser && token && refreshToken) {
        cookie.set('token', token);
        cookie.set('refreshToken', refreshToken);
      }
      this.token = token;
      this.refreshToken = refreshToken;
    };
  }

  
}

export default new Axios();
