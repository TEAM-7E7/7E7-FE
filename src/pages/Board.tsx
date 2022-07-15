import "../styles/pages/board.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BoardDto } from "../dto/BoardDto";
import { Button } from "../elements/Button";
import { timeUtils } from "../utils/timeUtils";

const Board = () => {
  const { board_id } = useParams();
  const [board, setBoard] = useState<BoardDto>();
  useEffect(() => {
    const getBoard = async () => {
      const result = await axios.get(`https://tryaz.shop/api/goods/${board_id}`);
      console.log(result);
      return result;
    };
    getBoard().then((result) => setBoard(result.data.data));
  }, []);
  console.log(board);
  return (
    <div className="board-wrapper">
      <div className="board-body">
        <div className="preview-images"></div>
        <div>
          <div className="board-contents">
            <div className="user-profile">
              <div className="user-img">
                <img src={board?.accountImageUrl === "default" ? board?.accountImageUrl : "img/default_profile.png"} />
              </div>
              <div className="user-nickname-created">
                <div className="user-nickname">{board?.nickname}</div>
                <div className="user-created">{timeUtils.createdTime(board?.createdAt)}</div>
              </div>
            </div>
            <div className="board-contents-text">
              <div className="board-title">{board?.title}</div>
              <div className="board-price">{board?.sellPrice}원</div>
              <div className="board-explain">{board?.description}</div>
              <div className="board-button"></div>
            </div>
          </div>
          <div className="board-button">
            <Button color="primary">판매자에게 1:1 채팅 보내기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
