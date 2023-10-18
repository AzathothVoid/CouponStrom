import axios from "axios";

const apiSerivce = axios.create({
  baseURL: process.env.API_URL,
});

export default apiSerivce;
