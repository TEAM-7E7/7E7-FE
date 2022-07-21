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

const BoardItem = ({ id, fileType, fileUrl, title, status, createdAt, sellPrice, autoPlay }: CategoryListInterface) => {
  const navigate = useNavigate();
  return (
    <div className="board-list-body">
      <div key={id} className="board-list-item-wrapper">
        <div className="board-list-item-img">
          {fileType === "mp4" ? <Video src={fileUrl} /> : <img src={fileUrl} />}
        </div>
        <div className="board-list-item-body">
          <div className="board-list-item-body-status">
            <h2>{title}</h2>
            <span>{status}</span>
          </div>
          <div className="board-list-item-body-price">
            <span>{timeUtils.timePass(createdAt)}</span>
            <h1>{sellPrice}원</h1>
          </div>
          <div className="board-list-item-body-detail">
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
    </div>
  );
};

export default BoardItem;
