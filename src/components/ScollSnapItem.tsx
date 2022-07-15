import { Video } from "../elements/Video";
import { timeUtils } from "../utils/timeUtils";
import { IconButton } from "../elements/IconButton";
import { ArrowIcon } from "../assets/icons/FigmaIcons";
import React from "react";
import "../styles/components/scollsnapitem.scss";

interface ScrollSnapItemInterface {
  fileType: string;
  fileUrl: string;
  scrollRef?: any;
  id: string;
  title: string;
  createdAt: any;
  sellPrice: any;
  autoPlay: boolean;
}

const ScrollSnapItem = ({
  fileType,
  fileUrl,
  scrollRef,
  id,
  title,
  createdAt,
  sellPrice,
  autoPlay,
}: ScrollSnapItemInterface) => {
  return (
    <div className="scroll-snap-item" key={id} ref={scrollRef}>
      <div className="scroll-snap-item-img">
        {fileType === "mp4" ? <Video src={fileUrl} autoPlay={autoPlay} /> : <img src={fileUrl} />}
        <div className="user-profile">
          <div className="user-img"></div>
          <div className="user-nickname"></div>
        </div>
      </div>
      <div className="scroll-snap-item-explain">
        <div className="item-title">{title}</div>
        <div className="item-created">{timeUtils.timePass(createdAt)}</div>
        <div className="item-price">{sellPrice}원</div>
        <div className="item-view-button">
          <IconButton icon={<ArrowIcon />} fullWidth>
            자세히 보러가기
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default ScrollSnapItem;
