import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://6a4d1fa6e1cf82a4a17e1b82.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosClient;