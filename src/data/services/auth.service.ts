import { AppConfig } from "../../common/config/app.config";
import CustomAxios from "../../common/config/axios.config";
import { HandleHttp } from "../../common/service/handle-http";
import { AuthModel } from "../models/auth.model";

const appConfig = new AppConfig();

const ALLOWED_USERNAMES = [
  "admin", "admin1", "admin2",
  "adminRefresh", "adminRefresh1", "adminRefresh2", "adminRefresh3", "adminRefresh4", "adminRefresh5", "adminRefresh6", "adminRefresh7", "adminRefresh8", "adminRefresh9", "adminRefresh10"
];

export const signIn = async (data: AuthModel) => {
  try {
    if (!ALLOWED_USERNAMES.includes(data.username)) {
      throw new Error("Tài khoản không hợp lệ. Vui lòng sử dụng tài khoản test được cấp.");
    }
    const domain = appConfig.getDomain();
    const payload = AuthModel.toJson(data);
    const resp = await CustomAxios.post(
      `${domain}/auth/login`,
      payload
    );
    appConfig.setAccessToken(resp.data?.accessToken);
    appConfig.setRefreshToken(resp.data?.refreshToken);
    appConfig.setTimeExpires();
    appConfig.setRefreshTimeExpires();
    return true;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}

export const refreshToken = async () => {
  try {
    const domain = appConfig.getDomain();

    if (appConfig.isRefreshExpires()) {
      await logout();
      window.location.href = "/login"; 
      return null;
    }
  
    const refreshToken = appConfig.getRefreshToken();
    if (!refreshToken) {
      throw new Error("Không tìm thấy refresh token.");
    }
    const resp = await CustomAxios.post(
      `${domain}/auth/refresh-token`,
      { refreshToken }
    );
   
    const newAccessToken = resp.data?.accessToken;

    appConfig.setAccessToken(newAccessToken);  
    appConfig.setTimeExpires();                

    return newAccessToken;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}

export const logout = async () => {
  try {
    const domain = appConfig.getDomain();
    await CustomAxios.delete(`${domain}/auth/logout`);
    await appConfig.clear();
    return true;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}