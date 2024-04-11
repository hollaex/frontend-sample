import { api } from "./axios";

class AuthService {
  async login(email, password) {
    const data = await api.post('/login', { email, password });
    return data;
  }

  async logout() {
    const data = await api.post('/logout');
    return data;
  }
}

export const authService = new AuthService();
