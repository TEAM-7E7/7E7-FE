import React, { useState } from "react";
import Sale from "../saleList/sale/Sale";
import Complete from "../saleList/complete/Complete";

const SaleList = () => {
  const [content, setContent] = useState(true);
  const [color, setColor] = useState(false);
  return (
    <div className="myProfile-body">
      <div className="category-status">
        <button
          className={
            color ? "button-medium button-filled button-text button-default" : "button-medium button-filled button-text"
          }
          onClick={() => {
            setContent(true), color ? setColor(false) : setColor(true);
          }}
        >
          판매중
        </button>
        <button
          className={
            color ? "button-medium button-filled button-text" : "button-medium button-filled button-text button-default"
          }
          onClick={() => {
            setContent(false), color ? setColor(false) : setColor(true);
          }}
        >
          거래완료
        </button>
      </div>
      <div className="myProfile-content">{content ? <Sale /> : <Complete />}</div>
    </div>
  );
};

export default SaleList;
