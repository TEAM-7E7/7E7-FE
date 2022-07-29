import { useEffect, useState } from "react";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import "../styles/pages/setting.scss";
import { useRefreshToken } from "../recoil/store";
import axios from "axios";
import PasswordChangeModal from "../components/modals/PasswordChangeModal";
import ResignModal from "../components/modals/ResignModal";
import NicknameChangeModal from "../components/modals/NicknameChangeModal";

const Setting = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  const { refreshToken, setRefreshToken } = useRefreshToken();
  // sell, buy, bookmark

  const [profileImg, setProfileImg] = useState(jwtUtils.getProfileImg(accessToken));
  const [opens, setOpens] = useState<{ [key: string]: boolean }>({
    nickname: false,
    passwordSearch: false,
    resign: false,
  });

  const opensType = {
    nickname: "nickname",
    passwordSearch: "passwordSearch",
    resign: "resign",
  };

  const onChangeModalOpen = (key: string) => setOpens((prev) => ({ ...prev, [key]: true }));
  const onChangeModalClose = (key: string) => setOpens((prev) => ({ ...prev, [key]: false }));

  const reloadToken = async () => {
    await axios
      .get("https://tryaz.shop/api/user/refresh-re", {
        headers: {
          "X-REFRESH-TOKEN": "BEARER " + refreshToken,
        },
      })
      .then((result) => {
        console.log(result.headers);
        const newRefreshToken = result.headers["x-refresh-token"].split(" ")[1];
        const newAccessToken = result.headers["x-access-token"].split(" ")[1];
        setRefreshToken(newRefreshToken);
        const expires = new Date();
        expires.setHours(expires.getHours() + 6);
        cookies.set("X-ACCESS-TOKEN", newAccessToken, { expires: expires });
      });
  };

  useEffect(() => {
    setProfileImg(jwtUtils.getProfileImg(accessToken));
  }, [accessToken]);

  return (
    <>
      <div className="setting-wrapper">
        <div className="setting-header">개인설정</div>
        <div className="setting-body">
          <div className="setting-body-section">
            <h4 className="setting-menus-title">개인 정보 및 설정</h4>
            <div className="setting-item" onClick={() => onChangeModalOpen(opensType.nickname)}>
              <span>닉네임 변경</span>
              <svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.355323 0.368312C-0.118482 0.857285 -0.118482 1.64716 0.355323 2.13614L5.06907 7.00079L0.355323 11.8654C-0.118482 12.3544 -0.118482 13.1443 0.355323 13.6333C0.829127 14.1222 1.5945 14.1222 2.06831 13.6333L7.64462 7.87843C8.11842 7.38946 8.11842 6.59958 7.64462 6.11061L2.06831 0.355774C1.60665 -0.120661 0.829127 -0.120661 0.355323 0.368312Z"
                  fill="#030303"
                />
              </svg>
            </div>
            <div className="setting-item" onClick={() => onChangeModalOpen(opensType.passwordSearch)}>
              <span>비밀번호 변경</span>
              <svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.355323 0.368312C-0.118482 0.857285 -0.118482 1.64716 0.355323 2.13614L5.06907 7.00079L0.355323 11.8654C-0.118482 12.3544 -0.118482 13.1443 0.355323 13.6333C0.829127 14.1222 1.5945 14.1222 2.06831 13.6333L7.64462 7.87843C8.11842 7.38946 8.11842 6.59958 7.64462 6.11061L2.06831 0.355774C1.60665 -0.120661 0.829127 -0.120661 0.355323 0.368312Z"
                  fill="#030303"
                />
              </svg>
            </div>
          </div>
          <div className="setting-body-section">
            <h4 className="setting-menus-title">계정 전환</h4>
            <div className="setting-item" onClick={() => onChangeModalOpen(opensType.resign)}>
              <span>탈퇴하기</span>
              <svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.355323 0.368312C-0.118482 0.857285 -0.118482 1.64716 0.355323 2.13614L5.06907 7.00079L0.355323 11.8654C-0.118482 12.3544 -0.118482 13.1443 0.355323 13.6333C0.829127 14.1222 1.5945 14.1222 2.06831 13.6333L7.64462 7.87843C8.11842 7.38946 8.11842 6.59958 7.64462 6.11061L2.06831 0.355774C1.60665 -0.120661 0.829127 -0.120661 0.355323 0.368312Z"
                  fill="#030303"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <NicknameChangeModal
        open={opens.nickname}
        handleClose={() => onChangeModalClose(opensType.nickname)}
        reloadToken={reloadToken}
      />

      <PasswordChangeModal
        open={opens.passwordSearch}
        handleClose={() => onChangeModalClose(opensType.passwordSearch)}
      />

      <ResignModal open={opens.resign} handleClose={() => onChangeModalClose(opensType.resign)} />
    </>
  );
};

export default Setting;
