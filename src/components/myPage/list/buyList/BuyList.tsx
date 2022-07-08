import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const BuyList = () => {
  // const saleList_query: any = useQuery(["post_list"], () => axios.get("http://localhost:3000/post_list"), {
  //   onSuccess: (data: any) => {
  //     console.log("success", data);
  //   },
  // });
  // console.log(saleList_query);
  return (
    <div className="myProfile-content">
      <div className="preview-main-image">
        {/*{values.files[0] && (values.files[0].type === "image" ? <img /> : <video />)}*/}
      </div>
      <div className="myProfile-product">
        <span>물건이름</span>
        <span>time</span>
      </div>
      <div className="product-price">
        <span>price</span>
        <span>구매</span>
      </div>
      <div className="product-detail">
        <button className="button-fullWidth button-medium button-default">자세히보러가기</button>
      </div>
    </div>
  );
};

export default BuyList;
