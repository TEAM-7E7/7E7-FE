import { MyPageBoardStateDto } from "../../dto/MyPageDto";
import React, { useEffect, useState } from "react";
import { instanceWithToken } from "../../api/api";
// import { Video } from "../../elements/Video";
import "../../styles/components/myPage/mypageboardlist.scss";
// import { timeUtils } from "../../utils/timeUtils";
// import { IconButton } from "../../elements/IconButton";
// import { ArrowIcon } from "../../assets/icons/FigmaIcons";
import SaleList from "../myPage/SaleList";

const MyPageBoardList = ({ boardState }: MyPageBoardStateDto) => {
  const [boardList, setBoardList] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // useEffect(() => {
  //   if (boardState === "buy") {
  //     const getSellBoard = async () => {
  //       const { data } = await instanceWithToken.post(`/api/goods/my-page?page=${page}&size=9`);
  //       setTotalCount(data.data.totalElements);
  //       setBoardList(data.data.goodsList);
  //     };
  //     getSellBoard();
  //   }
  // }, []);
  return (
    <div className="board-list-wrapper">
      {boardState === "sell" && (
        <div className="board-list-header">
          <SaleList />
        </div>
      )}
      {/*<div className="board-list-body">*/}
      {/*  {boardList?.map((item: any) => (*/}
      {/*    <div key={item.id} className="board-list-item-wrapper">*/}
      {/*      <div className="board-list-item-img">*/}
      {/*        {item.fileType === "mp4" ? <Video src={item?.goodsImageUrl} /> : <img src={item?.goodsImageUrl} />}*/}
      {/*      </div>*/}
      {/*      <div className="board-list-item-body">*/}
      {/*        <div className="board-list-item-body-status">*/}
      {/*          <h2>{item.title}</h2>*/}
      {/*          <span>{item.status}</span>*/}
      {/*        </div>*/}
      {/*        <div className="board-list-item-body-price">*/}
      {/*          <span>{timeUtils.timePass(item.createdAt)}</span>*/}
      {/*          <h1>{item.sellPrice}원</h1>*/}
      {/*        </div>*/}
      {/*        <div className="board-list-item-body-detail">*/}
      {/*          <IconButton icon={<ArrowIcon />} fullWidth>*/}
      {/*            자세히 보러가기*/}
      {/*          </IconButton>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className="board-list-footer"></div>
    </div>
  );
};
export default MyPageBoardList;
