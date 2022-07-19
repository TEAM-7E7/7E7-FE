import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video } from "../../../../../elements/Video";
import { IconButton } from "../../../../../elements/IconButton";
import { MoreOtionIcon } from "../../../../../assets/icons/FigmaIcons";
import MenuModal from "../../../../../elements/modals/MenuModal";
import { instanceWithToken } from "../../../../../api/api";
import { timeUtils } from "../../../../../utils/timeUtils";

const Sale = () => {
  const [show, setShow] = useState(false);
  const [goods, setGoodsList] = useState<any>([]);
  const popRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  //modal 바깥을 클릭하면 modal이 없어진다
  const onClickOutside = useCallback(
    ({ target }: any) => {
      if (popRef.current && !popRef.current.contains(target)) {
        setShow(false);
      }
    },
    [setShow],
  );
  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);
  //*** 더보기 버튼을 클릭했을때 modal창이 나타남
  const onModal = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);
  useEffect(() => {
    const getGoodsList = async () => {
      const res = await instanceWithToken.post("https://tryaz.shop/api/goods/my-page?page=1&size=5");
      console.log(res.data);
      setGoodsList(res.data.data.goodsList);
    };
    getGoodsList();
  }, []);
  return (
    <>
      <div className="content">
        {goods.map((item: any) => (
          <div className="content-body" key={item.id}>
            <div className="preview-main-item" key={item.id}>
              {item.fileType === "mp4" ? <Video src={item?.goodsImageUrl} /> : <img src={item?.goodsImageUrl} />}
            </div>
            <div className="myprofile-product">
              <div className="myprofile-product-body">
                <h2>{item.title}</h2>
                <span>{item.status}</span>
              </div>
              <div className="menumodal">
                <IconButton
                  icon={<MoreOtionIcon />}
                  iconSize="small"
                  size="small"
                  onClick={() => onModal()}
                  variant="none"
                ></IconButton>
                <MenuModal show={show} />
              </div>
            </div>
            <div className="product-price">
              <span>{timeUtils.timePass(item.createdAt)}</span>
              <h1>{item.sellPrice}원</h1>
            </div>
            <div className="product-detail">
              <button
                className="button-fullWidth button-primaryblue button-medium button-none"
                onClick={() => navigate(`/board/${item.id}`)}
                id={item.id}
              >
                <span>자세히보러가기</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Sale;
