import axios from "axios";

const instance = axios.create({
  baseURL: "https://encouraging-erin-neckerchief.cyclic.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// const instance = axios.create({
//   baseURL: "http://localhost:1900/api",
//   withCredentials: true,
// });

export default instance;
