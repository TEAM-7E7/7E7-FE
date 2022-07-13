import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/pages/mypage.scss";
import SaleList from "../../src/components/myPage/list/saleList/SaleList";
import BuyList from "../../src/components/myPage/list/buyList/BuyList";
import LikeList from "../../src/components/myPage/list/likeList/LikeList";
import { IconButton } from "../../src/elements/IconButton";
import {
  AlarmIcon,
  BuylistIcon,
  ChatIcon,
  LikelistIcon,
  SalelistIcon,
  UserIcon,
} from "../../src/assets/icons/FigmaIcons";
import Pagination from "../components/Pagination";

const MyProfilePage = () => {
  const [category, setCategory] = useState("saleList");
  const navigate = useNavigate();
  const onAlram = () => {
    navigate("/MyPageAlarm");
  };
  return (
    <div className="myProfile">
      <div className="myProfile-swapper">
        <h1>마이페이지</h1>
        <div className="myProfile-head">
          <div className="myProfile-head-user">
            <div className="user-img">
              <IconButton icon={<UserIcon />} iconSize="large"></IconButton>
            </div>
            <div className="user-info">
              <span className="user-nick">방배동 후라이팬</span>
              <span className="user-email">Email</span>
            </div>
          </div>
          <div className="myProfile-head-button">
            <IconButton icon={<ChatIcon />} iconSize="large"></IconButton>
            <IconButton icon={<AlarmIcon />} iconSize="large" onClick={onAlram}></IconButton>
          </div>
        </div>
        <div className="myProfile-body">
          <div className="myProfile-category">
            <div className="category-list">
              <IconButton size="large" onClick={() => setCategory("saleList")} icon={<SalelistIcon />} iconSize="large">
                <div className="list-content">
                  <span>판매내역</span>
                  <p>건</p>
                </div>
              </IconButton>
              <IconButton
                size="large"
                onClick={() => {
                  setCategory("buyList");
                }}
                icon={<BuylistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>구매목록</span>
                  <p>건</p>
                </div>
              </IconButton>
              <IconButton
                size="large"
                onClick={() => setCategory("likeList")}
                icon={<LikelistIcon />}
                iconSize="large"
                direction="left-right"
              >
                <div className="list-content">
                  <span>저장목록</span>
                  <p>건</p>
                </div>
              </IconButton>
            </div>
          </div>
          {category === "saleList" && <SaleList />}
          {category === "buyList" && <BuyList />}
          {category === "likeList" && <LikeList />}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
