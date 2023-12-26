import axios from "axios";

export const API_ENDPOINT = "http://localhost:8000";
//export const API_ENDPOINT = "";


export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const storedToken = localStorage.getItem("accessToken");

  config.headers = {
    'Authorization': `Bearer ${storedToken}`,
    ...config.headers
  };

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
