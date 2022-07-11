import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IconButton } from "../../../../../elements/IconButton";
import { MoreOtionIcon } from "../../../../../assets/icons/FigmaIcons";
import Modal from "../../../../../elements/modals/MenuModal";
import Pagination from "../../../../Pagination";

const Complete = () => {
  const [show, setShow] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);
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
  return (
    <>
      <div className="sale-body">
        <div className="preview-main-image">
          {/*{values.files[0] && (values.files[0].type === "image" ? <img /> : <video />)}*/}
        </div>
        <div className="myProfile-product">
          <span>물건 이름</span>
          <span>time</span>
          <div className="modal" ref={popRef}>
            <IconButton icon={<MoreOtionIcon />} iconSize="small" size="small" onClick={onModal}></IconButton>
            <Modal show={show} />
          </div>
        </div>
        <div className="product-price">
          <span>price</span>
          <span>판매완료</span>
        </div>
        <div className="product-detail">
          <button className="button-fullWidth button-medium button-default">자세히보러가기</button>
        </div>
      </div>
      <Pagination />
    </>
  );
};
export default Complete;
