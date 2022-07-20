import React, { useEffect, useState } from "react";
import BoardList from "./BoardList";
import { instanceWithToken } from "../../../api/api";

const SaleList = () => {
  const [content, setContent] = useState("Sale");
  const [color, setColor] = useState(false);
  const [goods, setGoodsList] = useState<any>([[{}]]);
  useEffect(() => {
    const getGoodsList = async () => {
      const res = await instanceWithToken.post("https://tryaz.shop/api/goods/my-page?page=1&size=5");
      setGoodsList(res.data.data.goodsList);
    };
    getGoodsList();
  }, []);
  return (
    <div className="myprofile-body">
      <div className="category-status">
        <button
          className={
            color
              ? "button-medium button-filled button-halfWidth button-text1"
              : "button-medium button-filled button-halfWidth button-text button-primaryblue"
          }
          onClick={() => {
            setContent("Sale"), color ? setColor(false) : setColor(true);
          }}
        >
          판매중({goods.length}건)
        </button>
        <button
          className={
            color
              ? "button-medium button-filled button-halfWidth button-text button-primaryblue"
              : "button-medium button-filled button-halfWidth button-text1"
          }
          onClick={() => {
            setContent("Complete"), color ? setColor(false) : setColor(true);
          }}
        >
          거래완료()
        </button>
      </div>
      <div className="myprofile-content">
        {goods.map((item: any) => {
          const fileType = item.goodsImageUrl;
          if (content === "Sale") {
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
          } else if (content === "Complete") {
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
  );
};

export default SaleList;
