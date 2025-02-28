import axios from "axios";
import { useBoundStore } from "@/store/store";
import { getToken } from "../../utils/helper";
import { handleRefreshTokenApi } from "@/services/auth/user-account";
import { ERROR_STATUS } from "../../utils/errors/errors";
import { BACKEND_URL } from "@/constants/common";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL, // Replace with your API base URL
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });

  failedQueue = [];
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    return res?.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry &&  error?.response?.data?.status === ERROR_STATUS.INVALID_TOKEN) {
      if (isRefreshing) {
        // If a refresh request is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh the token
        const response = await handleRefreshTokenApi();
        const { accessToken, refreshToken } = response.data;

        useBoundStore.setState({ token: accessToken, refreshToken: refreshToken });
        processQueue(null, accessToken); // Process queued requests with the new token

        isRefreshing = false;

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null); // Reject queued requests
        isRefreshing = false;
        // Redirect to login or handle logout
        const reset = useBoundStore.getState().reset;
        reset();
        return Promise.reject(refreshError);
      }
    }  else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
