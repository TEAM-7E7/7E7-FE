import React, { useState } from "react";
import { LikelistIcon, SalelistIcon } from "../assets/icons/FigmaIcons";
import { IconButton } from "./IconButton";
import LikeList from "../components/myPage/list/likeList/LikeList";
import SaleList from "../components/myPage/list/saleList/SaleList";

const SaleListButton = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="myProfile-body">
      <div className="myProfile-category">
        <div className="category-list">
          <IconButton size="large" onClick={() => setCategory("SaleList")} icon={<SalelistIcon />} iconSize="large">
            <div className="list-content">
              <span>저장내역</span>
              <p>건</p>
            </div>
          </IconButton>
        </div>
      </div>
      {category === "SaleList" && <SaleList />}
    </div>
  );
};

export default SaleListButton;
