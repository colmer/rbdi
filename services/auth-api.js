// import axios from 'axios';
import axios from '@/utils/axios';

const API = process.env.API;

class ApiService {
  signIn = (email, password) => {
    return axios.post(`/login`, { email, password });
  };

  signOut = () => {
    return axios.get(`${API}/auth/logout`);
  };

  signCheck = () => {
    return axios.get(`${API}/status`);
  };
}

export default new ApiService();
