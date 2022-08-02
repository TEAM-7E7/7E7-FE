import { Video } from "../elements/Video";
import { timeUtils } from "../utils/timeUtils";
import { IconButton } from "../elements/IconButton";
import { ArrowIcon } from "../assets/icons/FigmaIcons";
import React from "react";
import "../styles/components/scollsnapitem.scss";
import { useNavigate } from "react-router-dom";
import Label from "../elements/Label";
import { BoardCategory, BoardStatus } from "../dto/BoardCategoryAndState";
import numeral from "numeral";

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
  viewCount: number;
  wishIds: string[];
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
  viewCount,
  wishIds,
}: ScrollSnapItemInterface) => {
  const navigate = useNavigate();
  return (
    <div className="scroll-snap-item" key={id} ref={scrollRef}>
      <div className="scroll-snap-item-img">
        <div className="scroll-snap-item-img-gradient" />
        {fileType === "mp4" ? <Video src={fileUrl} autoPlay={autoPlay} /> : <img src={fileUrl} />}
        <div className="user-profile">
          <div className="user-img">
            {userImageUrl === "default" ? (
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.3333 12C15.6483 12 18.3333 9.315 18.3333 6C18.3333 2.685 15.6483 0 12.3333 0C9.01834 0 6.33334 2.685 6.33334 6C6.33334 9.315 9.01834 12 12.3333 12ZM12.3333 15C8.32834 15 0.333344 17.01 0.333344 21V22.5C0.333344 23.325 1.00834 24 1.83334 24H22.8333C23.6583 24 24.3333 23.325 24.3333 22.5V21C24.3333 17.01 16.3383 15 12.3333 15Z"
                  fill="#EBEEEF"
                />
              </svg>
            ) : (
              <img alt={userNickname} src={userImageUrl} />
            )}
          </div>
          <div className="user-nickname">{userNickname}</div>
        </div>
      </div>
      <div className="scroll-snap-item-explain">
        <div className="item-price-category-status">
          <div className="item-price">{numeral(sellPrice).format("0,0")}원</div>
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
              ) : status === "SOLD_OUT" ? (
                <Label size="small" type="sold-out">
                  {BoardStatus[status]}
                </Label>
              ) : (
                <Label size="small" type="reserved">
                  {BoardStatus[status]}
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="item-title">{title}</div>
        <div className="item-created">{timeUtils.timePass(createdAt)}</div>
        <div className="item-created">
          <span style={{ marginRight: "1rem" }}>조회수 {numeral(viewCount).format("0,0")}</span>
          <span>좋아요 {numeral(wishIds.length).format("0,0")}</span>
        </div>
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
