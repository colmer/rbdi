class ApiService {
  constructor(client) {
    this.client = client;
  }

  signIn = (email, password) => {
    return this.client.post('/login', { email, password });
  };

  signOut = () => {
    return this.client.get('/auth/logout');
  };

  signCheck = () => {
    return this.client.get('/auth/status');
  };
}

export default ApiService;
