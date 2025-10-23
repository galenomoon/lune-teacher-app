import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      destroyCookie(undefined, "token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const { token } = parseCookies();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
