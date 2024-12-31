import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res)=> {
    console.log(res)
    return res?.data
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
