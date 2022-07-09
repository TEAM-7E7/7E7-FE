import React, { useEffect, useRef, useState } from "react";
import "../styles/pages/home.scss";
import axios from "axios";

const Home = () => {
  const snapScrollWrapperRef = useRef<HTMLDivElement>(null);
  const [goods, setGoodsList] = useState<any>();
  useEffect(() => {
    const getGoodsList = async () => {
      const res = await axios.get("https://tryaz.shop/api/goods?pageNumber=0&pageSize=4/");
      console.log(res.data);
    };
    getGoodsList();
  }, []);
  const [images] = useState([
    { previewURL: "img/image1.jpg", type: "image" },
    { previewURL: "video/video1.mp4", type: "video" },
    { previewURL: "img/image2.jpg", type: "image" },
    { previewURL: "video/video2.mp4", type: "video" },
    { previewURL: "img/image3.png", type: "image" },
  ]);
  const playVideo = (e: React.UIEvent<HTMLDivElement>) => {
    // snap-scroll-wrapper의 뷰포트에서 맨 위 Y좌표와 맨 아래 Y좌표를 구함
    const snapScrollWrapperRect = (e.target as HTMLDivElement).getBoundingClientRect();
    const snapScrollWrapperTopY = snapScrollWrapperRect.top;
    const snapScrollWrapperBottomY = snapScrollWrapperRect.bottom;
    // 스크롤되는 아이템들은 snap-scoll-wrapper의 자식들(snap-scroll-item)이다.
    const snapScrollItems = (e.target as HTMLDivElement).childNodes;
    snapScrollItems.forEach((item: any) => {
      // 이미지나 비디오는 snap-scroll-item의 0번째 자식
      const snapScrollItem = item.childNodes[0];
      // 비디오일 때만 부모의 뷰포트 맨위와 맨 아래에 중심이 들어왔을 때 실행
      if (snapScrollItem.tagName === "VIDEO") {
        const snapScrollItemRect = item.childNodes[0].getBoundingClientRect();
        // snapScrollItem의 뷰포트에서 중앙 Y 좌표
        const snapScrollItemCenter = (snapScrollItemRect.top + snapScrollItemRect.bottom) / 2;
        if (snapScrollItemCenter > snapScrollWrapperTopY && snapScrollItemCenter < snapScrollWrapperBottomY) {
          snapScrollItem.play();
        } else {
          snapScrollItem.pause();
        }
      }
    });
  };
  return (
    <div className="snap-scroll-wrapper" ref={snapScrollWrapperRef} onScroll={playVideo}>
      {images.map((item, index) => (
        <div className="snap-scroll-item" key={index}>
          {item.type === "image" ? (
            <img src={item.previewURL} />
          ) : (
            <video src={item.previewURL} controls={true} muted={true} />
          )}
        </div>
      ))}
    </div>
  );
};
export default Home;