import axios from "axios";
import Cookies from "js-cookie";
import { COOKIE_AUTH } from "../constants/cookies";

axios.defaults.headers.common["Authorization"] = Cookies.get(COOKIE_AUTH) || null;
axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (axios.defaults.headers.common["Authorization"]) {
        axios.defaults.headers.common["Authorization"] = null;
        Cookies.remove(COOKIE_AUTH);
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  },
);
export const Request = axios;