import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../../src/styles/pages/mypage.scss";
import SaleList from "../components/myPage/list/SaleList";
import { IconButton } from "../../src/elements/IconButton";
import { AlarmIcon, BuylistIcon, LikelistIcon, MessageIcon, SalelistIcon } from "../assets/icons/FigmaIcons";
import { instanceWithToken } from "../api/api";
import { Cookies } from "react-cookie";
import { jwtUtils } from "../utils/jwtUtils";
import BoardList from "../components/myPage/list/BoardList";

const MyProfilePage = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  const [category, setCategory] = useState("SaleList");
  const [goods, setGoodsList] = useState<any>([]);
  useEffect(() => {
    jwtUtils.getNickname(accessToken);
    jwtUtils.getId(accessToken);
    jwtUtils.getEmail(accessToken);
    jwtUtils.getProfileImg(accessToken);
  });
  return (
    <div className="myprofile">
      <div className="myprofile-swapper">
        <h1>마이페이지</h1>
        <div className="myprofile-head">
          <div className="mypage-body-user-profile">
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
              <IconButton color="skyblue" variant="circle" icon={<MessageIcon />} iconSize="large"></IconButton>
            </div>
            <div className="alarm-icon">
              <IconButton color="skyblue" variant="circle" icon={<AlarmIcon />} iconSize="large"></IconButton>
            </div>
          </div>
        </div>
        <div className="myprofile-body">
          <div className="myprofile-category">
            <div className="category-list">
              <IconButton
                size="large"
                color="skyblue"
                onClick={() => setCategory("SaleList")}
                icon={<SalelistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>판매내역</span>
                </div>
              </IconButton>
              <IconButton
                size="large"
                color="skyblue"
                onClick={() => setCategory("BuyList")}
                icon={<BuylistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>구매내역</span>
                </div>
              </IconButton>
              <IconButton
                size="large"
                color="skyblue"
                onClick={() => setCategory("LikeList")}
                icon={<LikelistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>저장내역</span>
                </div>
              </IconButton>
            </div>
          </div>
          {category === "SaleList" && <SaleList />}
          <div className="content-swapper">
            {goods.map((item: any) => {
              const fileType = item.goodsImageUrl;
              if (category === "BuyList") {
                return (
                  <React.Fragment key={item.id}>
                    <BoardList
                      id={item.id}
                      fileType={fileType}
                      fileUrl={item.goodsImageUrl}
                      title={item.title}
                      status={item.status}
                      createdAt={item.createdAt}
                      sellPrice={item.sellPrice}
                      autoPlay={false}
                    />
                  </React.Fragment>
                );
              } else if (category === "LikeList") {
                return (
                  <React.Fragment key={item.id}>
                    <BoardList
                      id={item.id}
                      fileType={fileType}
                      fileUrl={item.goodsImageUrl}
                      title={item.title}
                      status={item.status}
                      createdAt={item.createdAt}
                      sellPrice={item.sellPrice}
                      autoPlay={false}
                    />
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
