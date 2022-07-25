import { Video } from "../elements/Video";
import { timeUtils } from "../utils/timeUtils";
import { IconButton } from "../elements/IconButton";
import { ArrowIcon } from "../assets/icons/FigmaIcons";
import React from "react";
import "../styles/components/scollsnapitem.scss";
import { useNavigate } from "react-router-dom";
import Label from "../elements/Label";
import { BoardCategory, BoardStatus } from "../dto/BoardCategoryAndState";

interface ScrollSnapItemInterface {
  userNickname: string;
  userImageUrl: string;
  fileType: string;
  fileUrl: string;
  scrollRef?: any;
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: any;
  sellPrice: any;
  autoPlay: boolean;
}

const ScrollSnapItem = ({
  userNickname,
  userImageUrl,
  fileType,
  fileUrl,
  scrollRef,
  id,
  title,
  category,
  status,
  createdAt,
  sellPrice,
  autoPlay,
}: ScrollSnapItemInterface) => {
  const navigate = useNavigate();
  return (
    <div className="scroll-snap-item" key={id} ref={scrollRef}>
      <div className="scroll-snap-item-img">
        <div className="scroll-snap-item-img-gradient" />
        {fileType === "mp4" ? <Video src={fileUrl} autoPlay={autoPlay} /> : <img src={fileUrl} />}
        <div className="user-profile">
          <div className="user-img">
            <img src={userImageUrl === "default" ? "/img/default_img.png" : userImageUrl} />
          </div>
          <div className="user-nickname">{userNickname}</div>
        </div>
      </div>
      <div className="scroll-snap-item-explain">
        <div className="item-price-category-status">
          <div className="item-price">{sellPrice}원</div>
          <div className="item-category-status">
            <div className="item-category">
              <Label type="category" size="small">
                {BoardCategory[category]}
              </Label>
            </div>
            <div className="item-status">
              {status === "SALE" ? (
                <Label size="small" type="sale">
                  {BoardStatus[status]}
                </Label>
              ) : (
                <Label size="small" type="sold-out">
                  {BoardStatus[status]}
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="item-title">{title}</div>
        <div className="item-created">{timeUtils.timePass(createdAt)}</div>
        <div
          className="item-view-button"
          onClick={() => {
            navigate(`/board/${id}`);
          }}
        >
          <IconButton icon={<ArrowIcon />} fullWidth>
            자세히 보러가기
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default ScrollSnapItem;
