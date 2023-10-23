import axios from "axios";

const ApiService = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

ApiService.interceptors.request.use(
  (config) => {
    const { user } = JSON.parse(sessionStorage.getItem("userData"));

    if (user) {
      config.headers.Authorization = `Bearer ${user}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default ApiService;
