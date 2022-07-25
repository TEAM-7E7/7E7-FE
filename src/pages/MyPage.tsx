import { useState } from "react";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import "../styles/pages/mypage.scss";
import { AlarmIcon, BookMarkIcon, BuyIcon, ChatIcon, SellIcon } from "../assets/icons/FigmaIcons";
import MyPageBoardList from "../components/myPage/MyPageBoardList";

const MyPage = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  // sell, buy, bookmark
  const [boardCategory, setBoardCategory] = useState<string>("sell");
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
          <div
            className="board-state"
            onClick={() => {
              setBoardCategory("sell");
            }}
          >
            <div className="state-icon">
              <SellIcon />
            </div>
            <div className="state-text">판매목록</div>
          </div>
          <div
            className="board-state"
            onClick={() => {
              setBoardCategory("buy");
            }}
          >
            <div className="state-icon">
              <BuyIcon />
            </div>
            <div className="state-text">구매목록</div>
          </div>
          <div
            className="board-state"
            onClick={() => {
              setBoardCategory("bookmark");
            }}
          >
            <div className="state-icon">
              <BookMarkIcon />
            </div>
            <div className="state-text">저장목록</div>
          </div>
        </div>
        <div className="mypage-body-board-list">
          <MyPageBoardList boardCategory={boardCategory} />
        </div>
      </div>
    </div>
  );
};
export default MyPage;
