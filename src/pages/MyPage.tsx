import { useRefreshToken } from "../recoil/store";
import { useEffect } from "react";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import "../styles/pages/mypage.scss";
import { AlarmIcon, ChatIcon, SellIcon } from "../assets/icons/FigmaIcons";

const MyPage = () => {
  const { refreshToken } = useRefreshToken();
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  useEffect(() => {
    console.log(
      jwtUtils.getNickname(accessToken),
      jwtUtils.getId(accessToken),
      jwtUtils.getEmail(accessToken),
      jwtUtils.getProfileImg(accessToken),
    );
  });
  return (
    <div className="mypage-wrapper">
      <div className="mypage-header">마이페이지</div>
      <div className="mypage-body">
        <div className="mypage-body-user-profile">
          <div className="user-profile">
            <div className="user-profile-img">
              <img
                src={
                  jwtUtils.getProfileImg(accessToken) === "default"
                    ? "/img/default_img.png"
                    : jwtUtils.getProfileImg(accessToken)
                }
              />
            </div>
            <div className="user-profile-nickname-email">
              <div className="user-profile-nickname">{jwtUtils.getNickname(accessToken)}</div>
              <div className="user-profile-email">{jwtUtils.getEmail(accessToken)}</div>
            </div>
          </div>
          <div className="message-alarm-icon">
            <div className="message-icon">
              <ChatIcon color="#FF965A" />
            </div>
            <div className="alarm-icon">
              <AlarmIcon color="#FFE247" />
            </div>
          </div>
        </div>
        <div className="mypage-body-board-state-menu">
          <div className="board-state-sell"></div>
          <div className="board-state-buy"></div>
          <div className="board-state-bookmark"></div>
        </div>
        <div className="mypage-body-board-items"></div>
      </div>
    </div>
  );
};
export default MyPage;
