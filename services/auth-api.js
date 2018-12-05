import axios from "axios";

const API = process.env.API;

class ApiService {
  signIn = async (username, password) => {
    return axios.post(`${API}/auth/login`, { username, password });
  };
}

export default new ApiService();
