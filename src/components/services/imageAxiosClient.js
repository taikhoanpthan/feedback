import axios from "axios";

const imageAxiosClient = axios.create({
  baseURL: "https://66c873ab8a477f50dc2e196c.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default imageAxiosClient;