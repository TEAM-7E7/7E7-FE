import { MyPageBoardCategoryDto } from "../../dto/MyPageDto";
import React, { useEffect, useState } from "react";
import { timeUtils } from "../../utils/timeUtils";
import { instanceWithToken } from "../../api/api";
import "../../styles/components/myPage/mypageboardlist.scss";
import { IconButton } from "../../elements/IconButton";
import { ArrowIcon } from "../../assets/icons/FigmaIcons";
import { useNavigate } from "react-router-dom";
import KebabMenu from "./KebabMenu";
import { Pagination } from "@mui/material";
import Label from "../../elements/Label";
import { BoardCategory } from "../../dto/BoardCategoryAndState";

const MyPageBoardList = ({ boardCategory }: MyPageBoardCategoryDto) => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<any>();
  console.log(boardList);
  // boardCategory가 sell일 때 사용
  // SALE, SOLD_OUT, RESERVED
  const [boardStatus, setBoardStatus] = useState<string>("SALE");
  // pagination을 위한 현재 page와 전체 페이지 수
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  useEffect(() => {
    if (boardCategory === "sell") {
      const getSellBoard = async () => {
        const { data } = await instanceWithToken.get(
          `/api/goods/my-page?page=${page}&size=6&goodsStatus=${boardStatus}`,
        );
        setPageCount(Math.ceil(data.data.totalElements / 6));
        setBoardList(data.data.goodsList);
      };
      getSellBoard();
    } else if (boardCategory === "bookmark") {
      const getBookmarkBoard = async () => {
        const { data } = await instanceWithToken.get(`/api/goods/my-wish?page=${page}&size=6`);
        setPageCount(Math.ceil(data.data.totalElements / 6));
        setBoardList(data.data.goodsList);
      };
      getBookmarkBoard();
    }
  }, [boardCategory, boardStatus, page]);
  return (
    <div className="board-list-wrapper">
      {boardCategory === "sell" && (
        <div className="board-list-header">
          <div
            className={`header-menu-sale  + ${
              boardStatus === "SALE" ? "header-menu-selected" : "header-menu-not-selected"
            } `}
            onClick={() => {
              setBoardStatus("SALE");
              setPage(1);
            }}
          >
            판매중
          </div>
          <div
            className={`header-menu-sold-out  + ${
              boardStatus === "SOLD_OUT" ? "header-menu-selected" : "header-menu-not-selected"
            } `}
            onClick={() => {
              setBoardStatus("SOLD_OUT");
              setPage(1);
            }}
          >
            판매완료
          </div>
        </div>
      )}
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
                {boardCategory === "sell" && <KebabMenu board_id={item.id} board_title={item.title} />}
              </div>
              <div className="item-created">{timeUtils.timePass(item.createdAt)}</div>
              <div className="item-price-category">
                <div className="item-price">{item.sellPrice} 원</div>
                <div className="item-category">
                  <Label type="category" size="small">
                    {BoardCategory[item.category]}
                  </Label>
                </div>
              </div>
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
      <div className="board-list-footer">
        <Pagination
          page={page}
          count={pageCount}
          size="medium"
          onChange={(e, value) => {
            setPage(value);
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
export default MyPageBoardList;
