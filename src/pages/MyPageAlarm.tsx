import React from "react";
import "../../src/styles/pages/mypagealarm.scss";
import { GoBackIcon, StarIcon, XIcon } from "../assets/icons/FigmaIcons";
import { IconButton } from "../elements/IconButton";
import { useNavigate } from "react-router-dom";
const MyPageAlarm = () => {
  const navigate = useNavigate();
  return (
    <div className="alarm-swapper">
      <div className="alarm-head">
        <IconButton
          icon={<GoBackIcon />}
          onClick={() => {
            navigate("/MyPage");
          }}
        />
        <h1>알림 전체보기</h1>
      </div>
      <div className="alarm-body">
        <img alt="" />
        <StarIcon />
        <span>User님이</span>
        <span>나에게 채팅을 보냈어요</span>
        <IconButton icon={<XIcon />} iconSize="small" size="small" />
      </div>
    </div>
  );
};

export default MyPageAlarm;
