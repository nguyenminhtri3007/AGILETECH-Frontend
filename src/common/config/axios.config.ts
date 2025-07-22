import axios, { AxiosError } from "axios";
import { AppConfig } from "./app.config";

const appConfig = new AppConfig();

const skipRoutes = ['auth/login', 'auth/refresh-token'];
const CustomAxios = axios.create();

CustomAxios.interceptors.request.use(
  async (config) => {
    const accessToken = appConfig.getAccessToken();


    if (accessToken && config.url && !skipRoutes.some(route => config.url?.includes(route))) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    console.error(">>> Lỗi khi gửi request:", error);
    console.log('aaaaaaaaaaaaaaa');
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  }
)

export default CustomAxios;