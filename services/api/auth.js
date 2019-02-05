class ApiService {
  constructor(client) {
    this.client = client;
  }

  signIn = (email, password) => {
    return this.client.post('/auth/login', { email, password });
  };

  signOut = (refreshToken = '') => {
    return this.client.post('/auth/logout', { refreshToken });
  };

  signCheck = () => {
    return this.client.get('/auth/status');
  };
}

export default ApiService;
