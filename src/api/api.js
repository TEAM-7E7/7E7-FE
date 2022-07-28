import axios from "axios";
import { Cookies } from "react-cookie";

export const instanceWithToken = axios.create({ baseURL: "https://tryaz.shop" });
instanceWithToken.interceptors.request.use(
  (config) => {
    const refreshTokenState = JSON.parse(localStorage.getItem("X-REFRESH-TOKEN"))
      ? JSON.parse(localStorage.getItem("X-REFRESH-TOKEN"))
      : "";
    const refreshToken = refreshTokenState["X-REFRESH-TOKEN"];
    const cookies = new Cookies();
    const accessToken = cookies.get("X-ACCESS-TOKEN");

    config.headers["X-REFRESH-TOKEN"] = `BEARER ${refreshToken}`;
    config.headers["X-ACCESS-TOKEN"] = `BEARER ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instanceWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshTokenState = JSON.parse(localStorage.getItem("X-REFRESH-TOKEN"))
      ? JSON.parse(localStorage.getItem("X-REFRESH-TOKEN"))
      : "";
    const refreshToken = refreshTokenState["X-REFRESH-TOKEN"];
    const cookies = new Cookies();
    // 원래 api
    const originalRequest = error.config;
    /*
      access token이 만료되면 refresh token을 가지고 재발급 받고
      원래 호출하려던 api에 새로운 access/refresh token을 넣어서 보냄
    */
    if (
      error.response.data === "JwtAuthFilter-Access-expired" ||
      error.response.data === "JwtAuthFilter-Access-Invalid"
    ) {
      // referesh token을 가지고 access token을 발급받는 api 호출
      await axios
        .post(
          "https://tryaz.shop/api/user/refresh-re",
          {},
          {
            headers: {
              "X-REFRESH-TOKEN": "BEARER " + refreshToken,
            },
          },
        )
        // refresh token을 가지고 access token 발급에 성공
        .then((result) => {
          const newRefreshToken = result.headers["x-refresh-token"].split(" ")[1];
          const newAccessToken = result.headers["x-access-token"].split(" ")[1];
          localStorage.setItem("X-REFRESH-TOKEN", `{"X-REFRESH-TOKEN": "${newRefreshToken}"}`);
          cookies.set("X-ACCESS-TOKEN", newAccessToken);
          originalRequest.headers["X-REFRESH-TOKEN"] = `BEARER ${newRefreshToken}`;
          originalRequest.headers["X-ACCESS-TOKEN"] = `BEARER ${newAccessToken}`;
        })
        // refresh token을 가지고 access token을 발급 받지 못하면 -> refresh token이 valid하지 않으면 로그인 페이지로 이동
        .catch((refresh_token_error) => {
          // refresh와 access token삭제
          localStorage.removeItem("X-REFRESH-TOKEN");
          cookies.remove("X-ACCESS-TOKEN");
          window.location.href = "/sign-in";
          alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요.");
          return false;
        });
      return axios(originalRequest);
      // access token은 유효하지만 refresh-token이 만료되면 로그인 페이지로 이동
      // 안생길듯? access token을 발급받을 때마다 refresh token도 같이 발급 받도록 서버에서 설정!
    } else if (error.response.data === "JwtAuthFilter-Refresh-expired") {
      localStorage.removeItem("X-REFRESH-TOKEN");
      cookies.remove("X-ACCESS-TOKEN");
      window.location.href = "/sign-in";
      return false;
    } else {
    }
    return Promise.reject(error);
  },
);
