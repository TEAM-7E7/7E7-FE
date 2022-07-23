import { MyPageBoardStateDto } from "../../dto/MyPageDto";
import React, { useEffect, useState } from "react";
import { timeUtils } from "../../utils/timeUtils";
import { instanceWithToken } from "../../api/api";
import "../../styles/components/myPage/mypageboardlist.scss";
import { IconButton } from "../../elements/IconButton";
import { ArrowIcon } from "../../assets/icons/FigmaIcons";
import { useNavigate } from "react-router-dom";
import KebabMenu from "./KebabMenu";

const MyPageBoardList = ({ boardState }: MyPageBoardStateDto) => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  useEffect(() => {
    if (boardState === "sell") {
      const getSellBoard = async () => {
        const { data } = await instanceWithToken.post(`/api/goods/my-page?page=${page}&size=9&goodsStatus=SALE`);
        setTotalCount(data.data.totalElements);
        setBoardList(data.data.goodsList);
      };
      getSellBoard();
    }
  }, []);
  console.log(boardList);
  return (
    <div className="board-list-wrapper">
      {boardState === "sell" && <div className="board-list-header"></div>}
      <div className="board-list-body">
        {boardList?.map((item: any) => (
          <div key={item.id} className="board-list-item-wrapper">
            <div className="board-list-item-img">
              {item.goodsImageUrl.split(".").at(-1) === "mp4" ? (
                <video src={item.goodsImageUrl} autoPlay={false} />
              ) : (
                <img src={item.goodsImageUrl} />
              )}
            </div>
            <div className="board-list-item-text">
              <div className="item-title-kebab">
                <div className="item-title">{item.title}</div>
                <KebabMenu board_id={item.id} board_title={item.title} />
              </div>
              <div className="item-created">{timeUtils.timePass(item.createdAt)}</div>
              <div className="item-price">{item.sellPrice} 원</div>
              <div
                className="item-view-button"
                onClick={() => {
                  navigate(`/board/${item.id}`);
                }}
              >
                <IconButton icon={<ArrowIcon />} size="small" fullWidth>
                  자세히 보러가기
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="board-list-footer"></div>
    </div>
  );
};
export default MyPageBoardList;
