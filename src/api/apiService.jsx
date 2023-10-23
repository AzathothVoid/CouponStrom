import axios from "axios";

const ApiService = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
