import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IconButton } from "../../../../../elements/IconButton";
import { MoreOtionIcon } from "../../../../../assets/icons/FigmaIcons";
import MenuModal from "../../../../../elements/modals/MenuModal";
import Pagination from "../../../../Pagination";

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
      const res = await axios.get("https://tryaz.shop/api/goods?pageNumber=0&pageSize=4/");
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
            <div className="preview-main-item">
              <img src={item.fileUrl} alt={item.title} />
              {/*{item.type === "image" ? (*/}
              {/*  <img src={item.fileUrl} />*/}
              {/*) : (*/}
              {/*  <video src={item.fileUrl} controls={true} muted={true} />*/}
              {/*)}*/}
            </div>
            <div className="myProfile-product">
              <span>{item.title}</span>
              <span>{item.createdAt}</span>
              <div className="menumodal" ref={popRef}>
                <IconButton icon={<MoreOtionIcon />} iconSize="small" size="small" onClick={onModal}></IconButton>
                <MenuModal show={show} />
              </div>
            </div>
            <div className="product-price">
              <span>{item.sellPrice}</span>
              <span>{item.status}</span>
            </div>
            <div className="product-detail">
              <button
                className="button-fullWidth button-medium button-default"
                onClick={() => navigate("/GoodsDetail")}
              >
                자세히보러가기
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </>
  );
};
export default Sale;
