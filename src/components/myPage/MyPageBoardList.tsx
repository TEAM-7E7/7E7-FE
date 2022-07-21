import { MyPageBoardStateDto } from "../../dto/MyPageDto";
import { useEffect, useState } from "react";
import { instanceWithToken } from "../../api/api";

const MyPageBoardList = ({ boardState }: MyPageBoardStateDto) => {
  const [boardList, setBoardList] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    if (boardState === "sell") {
      const getSellBoard = async () => {
        const { data } = await instanceWithToken.post("/api/goods/my-page?page=1&size=5");
      };
      getSellBoard();
    }
  }, []);
  return <></>;
};
export default MyPageBoardList;
