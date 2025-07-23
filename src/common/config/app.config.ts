
export class AppConfig {
    private domain = "https://nestjs-vercel-197.vercel.app";


    getDomain() {
        return this.domain;
    }

     setUserId(userId: number){
      localStorage.setItem('userId', JSON.stringify(userId));
    }

     getUserId(){
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                return JSON.parse(userId) as number;
            }

            return -1;
        } catch (error) {
            throw error;
        }
    }

    getUserInfo() {
      try {
          const userInfo = localStorage.getItem('userInfo');
          if (userInfo) {
              return userInfo;
          }

          return null;
      } catch (error) {
          throw error;
      }
    }

    setUserInfo(username: string) {
      localStorage.setItem('userInfo', username);
    }

     getAccessToken() {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return null;
      }

      return accessToken;
    }

     setAccessToken(token: string) {
      localStorage.setItem('accessToken', token);
    }

     getRefreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
          return null;
      }

      return refreshToken;
    }

     setRefreshToken(token: string) {
      localStorage.setItem('refreshToken', token);
    }

    setTimeExpires() {
      let endTime = Date.now() + 2 * 60 * 1000;
      localStorage.setItem('expireTime', endTime.toString());
    }

    isExpired() {
      const endTimeStr = localStorage.getItem('expireTime');

      if (endTimeStr !== null) {
        const endTime = parseInt(endTimeStr, 10);
        const now = Date.now();
        return now >= endTime;
      }

      return true;
    }

    setRefreshTimeExpires(){
      let endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('refreshExpireTime', endTime.toString());
    }

    isRefreshExpires(){
      const endTimeStr = localStorage.getItem('refreshExpireTime');

      if (endTimeStr !== null) {
        const endTime = parseInt(endTimeStr, 10);
        const now = Date.now();
        return now >= endTime;
      }

      return true;
    }

    async clear() {
      localStorage.clear();
    }
}