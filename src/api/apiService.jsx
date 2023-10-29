import axios from "axios";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

ApiService.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    var token;

    if (userData) {
      token = userData.user;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default ApiService;
