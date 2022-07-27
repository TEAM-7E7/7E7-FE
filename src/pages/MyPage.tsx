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
              {jwtUtils.getProfileImg(accessToken) === "default" ? (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.3333 12C15.6483 12 18.3333 9.315 18.3333 6C18.3333 2.685 15.6483 0 12.3333 0C9.01834 0 6.33334 2.685 6.33334 6C6.33334 9.315 9.01834 12 12.3333 12ZM12.3333 15C8.32834 15 0.333344 17.01 0.333344 21V22.5C0.333344 23.325 1.00834 24 1.83334 24H22.8333C23.6583 24 24.3333 23.325 24.3333 22.5V21C24.3333 17.01 16.3383 15 12.3333 15Z"
                    fill="#EBEEEF"
                  />
                </svg>
              ) : (
                <img alt={jwtUtils.getNickname(accessToken)} src={jwtUtils.getProfileImg(accessToken)} />
              )}
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
