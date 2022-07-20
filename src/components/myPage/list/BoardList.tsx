import React from "react";
import { Video } from "../../../elements/Video";
import { timeUtils } from "../../../utils/timeUtils";
import { ArrowIcon } from "../../../assets/icons/FigmaIcons";
import { IconButton } from "../../../elements/IconButton";
import { useNavigate } from "react-router-dom";
interface CategoryListInterface {
  id: string;
  fileType: any;
  fileUrl: string;
  title: string;
  status: string;
  createdAt: any;
  sellPrice: any;
  autoPlay: boolean;
}

const BoardList = ({ id, fileType, fileUrl, title, status, createdAt, sellPrice, autoPlay }: CategoryListInterface) => {
  const navigate = useNavigate();
  return (
    <div className="content">
      <div className="content-body" key={id}>
        <div className="preview-main-item">
          {fileType === "mp4" ? <Video src={fileUrl} autoPlay={autoPlay} /> : <img src={fileUrl} />}
        </div>
        <div className="myprofile-product">
          <div className="myprofile-product-body">
            <h2>{title}</h2>
            <span>{status}</span>
          </div>
        </div>
        <div className="product-price">
          <span>{timeUtils.timePass(createdAt)}</span>
          <h1>{sellPrice}원</h1>
        </div>
        <div className="product-detail">
          <IconButton
            icon={<ArrowIcon />}
            onClick={() => {
              navigate(`/MyPage/${id}`);
            }}
            fullWidth
          >
            자세히 보러가기
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
