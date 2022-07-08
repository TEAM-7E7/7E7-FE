import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const LikeList = () => {
  // const saleList_query = useQuery(
  //   ["saleList_list"],
  //   () => axios.get("http://3.35.233.99/api/boards"),
  //   {
  //     onSuccess: (post_query) => {},
  //   }
  // );
  return (
    <div className="myProfile-content">
      <div className="preview-main-image">
        {/*{values.files[0] && (values.files[0].type === "image" ? <img /> : <video />)}*/}
      </div>
      <div className="myProfile-product">
        <span>물건 이름</span>
        <span>time</span>
      </div>
      <div className="product-price">
        <span>price</span>
        <span>like</span>
      </div>
      <div className="product-detail">
        <button className="button-fullWidth button-medium button-default">자세히보러가기</button>
      </div>
    </div>
  );
};

export default LikeList;
