import React, { useEffect, useRef, useState } from "react";
import "../styles/pages/home.scss";
import { useBoardInfiniteQuery } from "../react-query/query/useBoardInfinteQuery";
import { useInView } from "react-intersection-observer";
import ScollSnapItem from "../components/ScollSnapItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const snapScrollWrapperRef = useRef<HTMLDivElement>(null);
  const { getBoard, getNextPage, getBoardIsSuccess, getNextPageIsPossible } = useBoardInfiniteQuery();
  const [scrollRef, isView] = useInView();
  useEffect(() => {
    // 맨 마지막 요소를 보고있고 맨 마지막 페이지에서 리턴한 isLast가 false가 아니면
    if (isView && getNextPageIsPossible) {
      getNextPage();
    }
  }, [isView]);

  const playVideo = (e: React.UIEvent<HTMLDivElement>) => {
    // snap-scroll-wrapper의 뷰포트에서 맨 위 Y좌표와 맨 아래 Y좌표를 구함
    const scrollSnapWrapperRect = (e.target as HTMLDivElement).getBoundingClientRect();
    const scrollSnapWrapperTopY = scrollSnapWrapperRect.top;
    const scrollSnapWrapperBottomY = scrollSnapWrapperRect.bottom;
    // 스크롤되는 아이템들은 snap-scoll-wrapper의 자식들(snap-scroll-item)이다.
    const scrollSnapItems = (e.target as HTMLDivElement).childNodes;
    scrollSnapItems.forEach((item: any) => {
      // 이미지나 비디오는 snap-scroll-item의 0번째 자식
      const scrollSnapItem = item.childNodes[0].childNodes[0].childNodes;
      // 비디오일 때만 부모의 뷰포트 맨위와 맨 아래에 중심이 들어왔을 때 실행
      if (scrollSnapItem[0] && scrollSnapItem[0].tagName === "VIDEO") {
        const snapScrollItemRect = item.childNodes[0].getBoundingClientRect();
        // snapScrollItem의 뷰포트에서 중앙 Y 좌표
        const snapScrollItemCenter = (snapScrollItemRect.top + snapScrollItemRect.bottom) / 2;
        if (snapScrollItemCenter > scrollSnapWrapperTopY && snapScrollItemCenter < scrollSnapWrapperBottomY) {
          scrollSnapItem[0].play();
        } else {
          scrollSnapItem[0].pause();
        }
      }
    });
  };
  return (
    <div className="scroll-snap-wrapper" ref={snapScrollWrapperRef} onScroll={playVideo}>
      {getBoardIsSuccess && getBoard?.pages
        ? getBoard.pages.map((page_data, page_num) => {
            const board_page = page_data.board_page;
            return board_page.map((item: any, idx: number) => {
              const fileType = item.fileUrl.split(".").at(-1);
              if (
                // 마지막 요소에 ref 달아주기
                page_num === getBoard.pages.length - 1 &&
                idx === board_page.length - 1
              ) {
                return (
                  <React.Fragment key={item.id}>
                    <ScollSnapItem
                      fileType={fileType}
                      fileUrl={item.fileUrl}
                      id={item.id}
                      title={item.title}
                      createdAt={item.createdAt}
                      sellPrice={item.sellPrice}
                      autoPlay={false}
                      scrollRef={scrollRef}
                    />
                  </React.Fragment>
                );
              } else if (page_num === 0 && idx === 0) {
                return (
                  <React.Fragment key={item.id}>
                    <ScollSnapItem
                      fileType={fileType}
                      fileUrl={item.fileUrl}
                      id={item.id}
                      title={item.title}
                      createdAt={item.createdAt}
                      sellPrice={item.sellPrice}
                      autoPlay={true}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={item.id}>
                    <ScollSnapItem
                      fileType={fileType}
                      fileUrl={item.fileUrl}
                      id={item.id}
                      title={item.title}
                      createdAt={item.createdAt}
                      sellPrice={item.sellPrice}
                      autoPlay={false}
                    />
                  </React.Fragment>
                );
              }
            });
          })
        : null}
    </div>
  );
};
export default Home;
