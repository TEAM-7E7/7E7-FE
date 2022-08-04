import jwtDecode from "jwt-decode";

export class jwtUtils {
  // 토큰 유효성 검사
  static isValid(token) {
    if (!token) {
      return false;
    } else {
      try {
        const decoded = jwtDecode(token);
        if (decoded.EXPIRED_DATE > new Date().getTime() / 1000) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  }

  // 토큰에서 유저 id 가져오기
  static getId(token) {
    const decoded = jwtDecode(token);
    return decoded.USER_ID;
  }

  static getNickname(token) {
    const decoded = jwtDecode(token);
    return decoded.USER_NAME;
  }

  static getEmail(token) {
    const decoded = jwtDecode(token);
    return decoded.USER_EMAIL;
  }

  static getProfileImg(token) {
    const decoded = jwtDecode(token);
    return decoded.USER_PROFILE_IMG;
  }

  static getUserIsSocial(token) {
    const decoded = jwtDecode(token);
    return !(decoded.USER_TYPE === "MARKETCLIP");
  }
  static getPayload(token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
}
