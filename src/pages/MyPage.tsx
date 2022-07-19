import React, { useEffect, useState } from "react";
import "../../src/styles/pages/mypage.scss";
import SaleList from "../../src/components/myPage/list/saleList/SaleList";
import BuyList from "../../src/components/myPage/list/buyList/BuyList";
import LikeList from "../../src/components/myPage/list/likeList/LikeList";
import { IconButton } from "../../src/elements/IconButton";
import { AlarmIcon, BuylistIcon, LikelistIcon, MessageIcon, SalelistIcon } from "../assets/icons/FigmaIcons";
import { Cookies } from "react-cookie";
import { jwtUtils } from "../utils/jwtUtils";
import { instanceWithToken } from "../api/api";

const MyProfilePage = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  const [category, setCategory] = useState("saleList");
  const [goods, setGoodsList] = useState<any>([]);
  useEffect(() => {
    console.log(
      jwtUtils.getNickname(accessToken),
      jwtUtils.getId(accessToken),
      jwtUtils.getEmail(accessToken),
      jwtUtils.getProfileImg(accessToken),
    );
  });
  useEffect(() => {
    const getGoodsList = async () => {
      const res = await instanceWithToken.post("https://tryaz.shop/api/goods/my-page?page=1&size=5");
      console.log(res.data);
      setGoodsList(res.data.data.goodsList);
    };
    getGoodsList();
  }, []);
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
              <IconButton color="blue" variant="circle" icon={<MessageIcon />} iconSize="large"></IconButton>
            </div>
            <div className="alarm-icon">
              <IconButton color="blue" variant="circle" icon={<AlarmIcon />} iconSize="large"></IconButton>
            </div>
          </div>
        </div>
        <div className="myprofile-body">
          <div className="myprofile-category">
            <div className="category-list">
              <IconButton
                size="large"
                color="blue"
                onClick={() => setCategory("SaleList")}
                icon={<SalelistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>판매내역</span>
                  <p>{goods.length}건</p>
                </div>
              </IconButton>
              <IconButton
                size="large"
                color="blue"
                onClick={() => setCategory("BuyList")}
                icon={<BuylistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>구매내역</span>
                  <p>건</p>
                </div>
              </IconButton>
              <IconButton
                size="large"
                color="blue"
                onClick={() => setCategory("LikeList")}
                icon={<LikelistIcon />}
                iconSize="large"
              >
                <div className="list-content">
                  <span>저장내역</span>
                  <p>건</p>
                </div>
              </IconButton>
            </div>
          </div>
          {category === "SaleList" && <SaleList />}
          {category === "BuyList" && <BuyList />}
          {category === "LikeList" && <LikeList />}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
