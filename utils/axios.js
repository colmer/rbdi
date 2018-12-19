import axios from 'axios';
import cookie from 'js-cookie';

axios.defaults.baseURL = process.env.API;

// class Axios {
//   constructor(options = {}) {
//     this.client = options.client || axios.create();
//     this.token = options.token;
//     this.refreshToken = options.refreshToken;
//     this.refreshRequest = null;

//     this.client.interceptors.request.use(
//       config => {
//         if (!this.token) {
//           return config;
//         }

//         const newConfig = {
//           headers: {},
//           ...config,
//         };

//         newConfig.headers.Authorization = `Bearer ${this.token}`;
//         return newConfig;
//       },
//       e => Promise.reject(e),
//     );

//     this.client.interceptors.response.use(
//       r => r,
//       async error => {
//         if (!this.refreshToken || error.response.status !== 401 || error.config.retry) {
//           throw error;
//         }

//         if (!this.refreshRequest) {
//           this.refreshRequest = this.client.post('/auth/refresh', {
//             refreshToken: this.refreshToken,
//           });
//         }
//         const { data } = await this.refreshRequest;
//         this.token = data.token;
//         this.refreshToken = data.refreshToken;
//         const newRequest = {
//           ...error.config,
//           retry: true,
//         };

//         return this.client(newRequest);
//       },
//     );
//   }
// }

// const updatedAxios = new Axios({
//   token: cookie.get('token'),
//   refreshToken: cookie.get('refreshToken'),
// });

// export default updatedAxios.client;

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

    const { data } = await axios.post('/auth/refresh', {
      refreshToken: cookie.get('refreshToken'),
    });

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
