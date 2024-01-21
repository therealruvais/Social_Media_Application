import axios from "axios";

const instance = axios.create({
  baseURL: "https://pichub-server.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
