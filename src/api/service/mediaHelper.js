import Cookies from "js-cookie";
import { axiosInstanceMedia } from "../axiosInstance";

const config = {
  withCredentials: false,
};

const getAccessToken = () => Cookies.get("auth_token");

const privateConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    "Content-type": "multipart/form-data",
  },
  withCredentials: false,
});

export const mediaApi = {
  get: async (url) => {
    const response = await axiosInstanceMedia.get(url, { ...config });
    return response;
  },

  postPrivate: async (url, data) => {
    const res = await axiosInstanceMedia.post(url, data, privateConfig());
    return res;
  },

  putPrivate: async (url, data) => {
    const res = await axiosInstanceMedia.put(url, data, privateConfig());
    return res;
  },

  deletePrivate: async (url, data) => {
    const res = await axiosInstanceMedia.delete(url, {
      ...privateConfig(),
      data: data,
    });
    return res;
  },
};
