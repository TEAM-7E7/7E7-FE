import React, { useEffect, useState } from "react";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import "../styles/pages/mypage.scss";
import { AlarmIcon, BookMarkIcon, BuyIcon, ChatIcon, ConfigIcon, SellIcon } from "../assets/icons/FigmaIcons";
import MyPageBoardList from "../components/myPage/MyPageBoardList";
import { instanceWithToken } from "../api/api";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button } from "../elements/Button";
import { useRefreshToken } from "../recoil/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MetaTag from "../utils/MetaTag";

const MyPage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  const { refreshToken, setRefreshToken } = useRefreshToken();
  // sell, buy, bookmark
  const [boardCategory, setBoardCategory] = useState<string>("sell");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState(jwtUtils.getProfileImg(accessToken));
  const [isOpen, setOpen] = useState<boolean>(false);

  const reloadToken = async () => {
    await axios
      .get("https://tryaz.shop/api/user/refresh-re", {
        headers: {
          "X-REFRESH-TOKEN": "BEARER " + refreshToken,
        },
      })
      .then((result) => {
        const newRefreshToken = result.headers["x-refresh-token"].split(" ")[1];
        const newAccessToken = result.headers["x-access-token"].split(" ")[1];
        setRefreshToken(newRefreshToken);
        const daysToExpire = new Date(2147483647 * 1000);
        cookies.set("X-ACCESS-TOKEN", newAccessToken, { expires: daysToExpire });
      });
  };

  const uploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files === null || e.target.files?.length === 0) return;
    const file = e.target.files[0];
    const src = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("userProfile", file);
    await instanceWithToken
      .post("/api/user/profile-img", formData)
      .then((res) => {
        // TODO jwtUtils에서(token)
        setProfileImg(res.data.data.url);
        reloadToken();
      })
      .catch((err) => console.log(err.response.data.message))
      .finally(() => {
        setLoading(false);
        URL.revokeObjectURL(src);
        e.target.files = null;
      });
  };

  const deleteProfileImage = async () => {
    setLoading(true);
    await instanceWithToken
      .delete("/api/user/profile-img")
      .then((res) => {
        reloadToken();
        setProfileImg("default");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  useEffect(() => {
    setProfileImg(jwtUtils.getProfileImg(accessToken));
  }, [accessToken]);

  return (
    <>
      <MetaTag title="내정보" />
      <div className="mypage-wrapper">
        <div className="mypage-header">마이페이지</div>
        <div className="mypage-body">
          <div className="mypage-body-user-profile">
            <div className="user-profile">
              <div className="user-profile-img-wrapper">
                <label htmlFor="user-profile-upload" className="user-profile-img">
                  {profileImg === "default" ? (
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.3333 12C15.6483 12 18.3333 9.315 18.3333 6C18.3333 2.685 15.6483 0 12.3333 0C9.01834 0 6.33334 2.685 6.33334 6C6.33334 9.315 9.01834 12 12.3333 12ZM12.3333 15C8.32834 15 0.333344 17.01 0.333344 21V22.5C0.333344 23.325 1.00834 24 1.83334 24H22.8333C23.6583 24 24.3333 23.325 24.3333 22.5V21C24.3333 17.01 16.3383 15 12.3333 15Z"
                        fill="#EBEEEF"
                      />
                    </svg>
                  ) : (
                    <img alt={jwtUtils.getNickname(accessToken)} src={profileImg} />
                  )}
                </label>
                {jwtUtils.getProfileImg(accessToken) !== "default" && (
                  <button className="user-profile-delete-button" onClick={() => setOpen(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      strokeWidth="5"
                      stroke="white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
                <input
                  id="user-profile-upload"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={uploadProfileImage}
                  style={{ display: "none" }}
                />
              </div>
              <div className="user-profile-nickname-email">
                <div className="user-profile-nickname">{jwtUtils.getNickname(accessToken)}</div>
                <div className="user-profile-email">{jwtUtils.getEmail(accessToken)}</div>
              </div>
            </div>
            <div className="message-alarm-icon">
              <i
                onClick={() => {
                  navigate("/chatting");
                }}
              >
                <ChatIcon color="#FF965A" />
              </i>
              <i>
                <AlarmIcon color="#FFE247" />
              </i>
              <i onClick={() => navigate("/setting")}>
                <ConfigIcon color="#80C9FF" />
              </i>
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

      <Dialog open={isOpen}>
        <DialogTitle>프로필 사진을 삭제하시겠습니까?</DialogTitle>
        <DialogActions sx={{ display: "flex" }}>
          <Button onClick={() => setOpen(false)}>닫기</Button>
          <Button onClick={deleteProfileImage}>삭제</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MyPage;
