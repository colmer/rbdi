import axios from '@/utils/axios';

class ApiService {
  signIn = (email, password) => {
    return axios.post('/login', { email, password });
  };

  signOut = () => {
    return axios.get('/auth/logout');
  };

  signCheck = () => {
    console.log('#############', 'status check');
    return axios.get('/auth/status');
  };
}

export default new ApiService();
