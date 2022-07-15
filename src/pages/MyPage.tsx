import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../../src/styles/pages/mypage.scss";
import SaleList from "../../src/components/myPage/list/saleList/SaleList";
import BuyList from "../../src/components/myPage/list/buyList/BuyList";
import LikeList from "../../src/components/myPage/list/likeList/LikeList";
import { IconButton } from "../../src/elements/IconButton";
import { AlarmIcon, BuylistIcon, ChatIcon, LikelistIcon, SalelistIcon, UserIcon } from "../assets/icons/FigmaIcons";
import axios from "axios";
import { instanceWithToken } from "../api/api";
import { BoardDto } from "../dto/BoardDto";
import { refresh_token, useRefreshToken } from "../recoil/store";
import { useRecoilState } from "recoil";

const MyProfilePage = () => {
  const [refreshToken] = useRecoilState(refresh_token);
  //const [refreshToken]: any = useRefreshToken();
  const [category, setCategory] = useState("saleList");
  const [board, setBoard] = useState<BoardDto>();
  const { board_id } = useParams();
  // const data = [<SaleListButton />, <BuyListButton />, <LikstListButton />];
  const navigate = useNavigate();
  const onAlram = () => {
    navigate("/MyPageAlarm");
  };
  useEffect(() => {
    const getBoard = async () => {
      const result = await axios.get(`https://tryaz.shop/api/goods/my-page?page=1&size=5`, {
        headers: { "X-REFRESH-TOKEN": "BEARER " + refreshToken },
      });
      console.log(result);
      return result;
    };
    getBoard().then((result) => setBoard(result.data.data));
  }, []);
  console.log(board);
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
              <span className="user-email">asfd@adsf</span>
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
                  <p>건</p>
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
