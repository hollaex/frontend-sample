import { api } from "./axios";

class UserService {
  async getUserData() {
    const data = await api.get('/user');
    return data;
  }
}

export const userService = new UserService();
