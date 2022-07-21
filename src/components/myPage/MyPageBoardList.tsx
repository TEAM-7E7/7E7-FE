import { MyPageBoardStateDto } from "../../dto/MyPageDto";
import { useEffect, useState } from "react";
import { instanceWithToken } from "../../api/api";
import "../../styles/components/myPage/mypageboardlist.scss";

const MyPageBoardList = ({ boardState }: MyPageBoardStateDto) => {
  const [boardList, setBoardList] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    if (boardState === "sell") {
      const getSellBoard = async () => {
        const { data } = await instanceWithToken.post(`/api/goods/my-page?page=${page}&size=9`);
        setTotalCount(data.data.totalElements);
        setBoardList(data.data.goodsList);
      };
      getSellBoard();
    }
  }, []);
  return (
    <div className="board-list-wrapper">
      {boardState === "sell" && <div className="board-list-header">123123</div>}
      <div className="board-list-body">
        {boardList?.map((item: any) => (
          <div key={item.id} className="board-list-item-wrapper"></div>
        ))}
      </div>
      <div className="board-list-footer"></div>
    </div>
  );
};
export default MyPageBoardList;
