import axios, { AxiosError } from "axios";
import { AppConfig } from "./app.config";
import * as AuthService from "../../data/services/auth.service";
import { ErrorModel } from "../model/error.model";
import { HttpCode } from "../resource/http-code";

const appConfig = new AppConfig();

const skipRoutes = ['auth/login', 'auth/refresh-token'];
const CustomAxios = axios.create();

CustomAxios.interceptors.request.use(
  async (config) => {
    const accessToken = appConfig.getAccessToken();


    if (accessToken && config.url && !skipRoutes.some(route => config.url?.includes(route))) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      const isExpired = appConfig.isExpired();
      if(isExpired){
        try {
          const isRefreshExpired = appConfig.isRefreshExpires();
          if(isRefreshExpired){
            throw new ErrorModel(HttpCode.UNAUTHORIZED, "Hết phiên đăng nhập");
          }
          const newAccessToken = await AuthService.refreshToken();
          appConfig.setAccessToken(newAccessToken);
          appConfig.setTimeExpires();
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.log('Error: ', error);
          if(error instanceof ErrorModel){
            if(error.status === HttpCode.UNAUTHORIZED){
              appConfig.clear();
              throw (new AxiosError("Hết phiên đăng nhập", HttpCode.UNAUTHORIZED + ""));
            }
          }
        }
      }
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