import axios from 'axios';
import cookie from 'js-cookie';

// const token = cookie.get('token');
// if (token) axios.defaults.headers.common['Authorization'] = `Berear ${token}`;
axios.defaults.baseURL = process.env.API;

axios.interceptors.request.use(
  function(config) {
    // config.headers.common['Authorization'] = `Bearer ${token}`;
    const token = cookie.get('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    console.log('config', config);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function(response) {
    console.log('Response', response);
    // Do something with response data
    return response;
  },
  async function(err) {
    const res = err.response;
    const token = cookie.get('token');
    if ((res.status === 401 || res.status === 403) && token) {
      console.log('Remove token');
      cookie.remove('token');

      await axios.put('/token', { refreshToken: cookie.get('refreshToken') });
      console.log('Request');
    }
    console.log('Error', err);
    // Do something with response error
    return Promise.reject(err);
  },
);

// const client = axios.create({
//   baseURL: process.env.API,
// });

// const request = function(options) {
//   // console.log('Request');
//   // return await client(options);
//   //     const onSuccess = function(response) {
//   //     console.debug('Request Successful!', response);
//   //     return response.data;
//   //   };

//   //   const onError = function(error) {
//   //     console.error('Request Failed:', error.config);

//   //     if (error.response) {
//   //       // Request was made but server responded with something
//   //       // other than 2xx
//   //       console.error('Status:', error.response.status);
//   //       console.error('Data:', error.response.data);
//   //       console.error('Headers:', error.response.headers);
//   //     } else {
//   //       // Something else happened while setting up the request
//   //       // triggered the error
//   //       console.error('Error Message:', error.message);
//   //     }

//   //     return Promise.reject(error.response || error.message);
//   //   };

//   return client(options)
//     .then(onSuccess)
//     .catch(onError);
// };

export default axios;
