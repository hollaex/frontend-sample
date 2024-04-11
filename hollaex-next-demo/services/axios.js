import axios from "axios";
const baseURL = "https://api.sandbox.hollaex.com/v2";

class API {
  constructor() {
    this.api = axios.create({
        baseURL,
      });

      this.api.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  }

  async setAuthorizationHeaders(token) {
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  async setHeaderConfig (keyName, value) {
    return this.api.interceptors.request.use((config) => {
      config.headers[keyName] =  value;
      return config;
    });

  }

  async get(url, config) {
    return this.api.get(url, config).then((res) => res.data);
  }

  async post(url, data, config) {
    return this.api.post(url, data, config).then((res) => res.data);
  }

  async patch(url, data, config) {
    return this.api.patch(url, data, config).then((res) => res.data);
  }

  async put(url, data, config) {
    return this.api.put(url, data, config).then((res) => res.data);
  }

  async delete(url, config) {
    return this.api.delete(url, config).then((res) => res.data);
  }
}

export const api = new API();
