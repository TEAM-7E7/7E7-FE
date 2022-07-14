import React, { useState } from "react";
import { BuylistIcon, SalelistIcon } from "../assets/icons/FigmaIcons";
import { IconButton } from "./IconButton";
import BuyList from "../components/myPage/list/buyList/BuyList";
import SaleList from "../components/myPage/list/saleList/SaleList";

const BuyListButton = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="myProfile-body">
      <div className="myProfile-category">
        <div className="category-list">
          <IconButton size="large" onClick={() => setCategory("BuyList")} icon={<BuylistIcon />} iconSize="large">
            <div className="list-content">
              <span>구매내역</span>
              <p>건</p>
            </div>
          </IconButton>
        </div>
      </div>
      {category === "BuyList" && <BuyList />}
    </div>
  );
};

export default BuyListButton;
