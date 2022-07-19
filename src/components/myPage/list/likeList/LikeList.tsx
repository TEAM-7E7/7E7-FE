import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "../../../../elements/IconButton";
import { MoreOtionIcon } from "../../../../assets/icons/FigmaIcons";
import MenuModal from "../../../../elements/modals/MenuModal";
import Modal from "../../../../elements/modals/MenuModal";
import { useNavigate } from "react-router-dom";
import { timeUtils } from "../../../../utils/timeUtils";

const LikeList = () => {
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
  // useEffect(() => {
  //   const getGoodsList = async () => {
  //     const res = await axios.get("https://tryaz.shop/api/goods?pageNumber=0&pageSize=4/");
  //     console.log(res.data);<span>{timeUtils.timePass(item.createdAt)}</span>
  //     setGoodsList(res.data.data.goodsList);
  //   };
  //   getGoodsList();
  // }, []);
  return (
    <>
      <div className="content">
        {goods.map((item: any, idx: any) => (
          <div className="content-body" key={item.id}>
            <div className="preview-main-item">
              {item.type === "mp4" ? (
                <video src={item.fileUrl} controls={true} muted={true} />
              ) : (
                <img src={item.fileUrl} />
              )}
            </div>
            <div className="myprofile-product">
              <div className="myprofile-product-body">
                <h2>{item.title}</h2>
                <span>{item.status}</span>
              </div>
              <div className="menumodal" ref={popRef} key={idx}>
                <IconButton
                  icon={<MoreOtionIcon />}
                  iconSize="small"
                  size="small"
                  onClick={onModal}
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
                className="button-fullWidth button-lightblue button-medium button-none"
                onClick={() => navigate("/GoodsDetail")}
              >
                자세히보러가기
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LikeList;
