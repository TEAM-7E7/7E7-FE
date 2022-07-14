import React, { useEffect, useState } from "react";
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
import axios from "axios";

const MyProfilePage = () => {
  const [category, setCategory] = useState("saleList");
  const [goods, setGoodsList] = useState<any>([]);
  // const data = [<SaleListButton />, <BuyListButton />, <LikstListButton />];
  const navigate = useNavigate();
  const onAlram = () => {
    navigate("/MyPageAlarm");
  };
  useEffect(() => {
    const getGoodsList = async () => {
      const res = await axios.get("https://tryaz.shop/api/goods?pageNumber=0&pageSize=4/");
      console.log(res.data);
      setGoodsList(res.data.data.goodsList);
    };
    getGoodsList();
  }, []);
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
            <IconButton color="blue" variant="circle" icon={<ChatIcon />} iconSize="large"></IconButton>
            <IconButton
              color="blue"
              variant="circle"
              icon={<AlarmIcon />}
              iconSize="large"
              onClick={onAlram}
            ></IconButton>
          </div>
        </div>
        <div className="myProfile-body">
          <div className="myProfile-category">
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
                  <p>{goods.length}건</p>
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
                  <p>{goods.length}건</p>
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
