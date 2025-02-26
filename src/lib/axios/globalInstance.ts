import { BACKEND_URL } from "@/constants/common";
import axios from "axios";

const globalInstance = axios.create({
  baseURL: BACKEND_URL, // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

// Add a request interceptor
globalInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
globalInstance.interceptors.response.use(
  (res)=> {
    return res?.data
  },
  function (error) {
    return Promise.reject(error?.response?.data);
  }
);

export default globalInstance;
