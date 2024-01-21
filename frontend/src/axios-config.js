import axios from "axios";

const instance = axios.create({
  baseURL: "https://pichub-server.onrender.com/api",
  withCredentials: true,
});

export default instance;
