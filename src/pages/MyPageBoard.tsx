import "../styles/pages/board.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BoardDto } from "../dto/BoardDto";
import { Button } from "../elements/Button";
import { timeUtils } from "../utils/timeUtils";
import { Video } from "../elements/Video";

const Board = () => {
  const navigate = useNavigate();
  const { board_id } = useParams();
  const [board, setBoard] = useState<BoardDto>();
  useEffect(() => {
    const getBoard = async () => {
      const result = await axios.get(`https://tryaz.shop/api/goods/${board_id}`);
      return result;
    };
    getBoard().then((result) => setBoard(result.data.data));
  }, []);
  const onDelete = async () => {
    await axios.delete(`https://tryaz.shop/api/goods/${board_id}`);
    alert("게시물이 삭제되었습니다");
    navigate("/MyPage");
  };
  return (
    <div className="board-wrapper">
      <div className="board-body">
        <div className="preview-images">
          {board?.imageMapList[0].url.split(".").at(-1) === "mp4" ? (
            <Video src={board?.imageMapList[0].url} autoPlay={true} />
          ) : (
            <img src={board?.imageMapList[0].url} />
          )}
        </div>
        <div>
          <div className="board-contents">
            <div className="user-profile">
              <div className="user-img">
                <img src={board?.accountImageUrl === "default" ? "/img/default_img.png" : board?.accountImageUrl} />
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
            <Button color="primary">수정</Button>
            <Button color="primary" onClick={onDelete}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Board;
