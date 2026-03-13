import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_MODE === "development"
    ? import.meta.env.VITE_API_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_PROD_BACKEND_URL;

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosInstanceMedia = axios.create({
  baseURL: MEDIA_URL,
});

export { axiosInstance, axiosInstanceMedia, MEDIA_URL, BASE_URL };
