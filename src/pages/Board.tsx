import "../styles/pages/board.scss";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../elements/Button";
import { timeUtils } from "../utils/timeUtils";
import BoardCarousel from "../components/BoardCarousel";
import { useBoardQuery } from "../react-query/query/useBoardQuery";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import DeleteBoardModal from "../components/modals/DeleteBoardModal";
import { useRefreshToken } from "../recoil/store";
import { BoardCategory, BoardStatus } from "../dto/BoardCategoryAndState";
import Label from "../elements/Label";
import { BookMarkIcon } from "../assets/icons/FigmaIcons";

const Board = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { refreshToken } = useRefreshToken();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { board_id } = useParams();
  const { getBoard, getBoardIsSuccess, addBookmarkMutation, deleteBookmarkMutation } = useBoardQuery(board_id);

  return (
    <div className="board-wrapper">
      {getBoardIsSuccess && (
        <div className="board-body">
          <div className="preview-images">
            {getBoard?.data.data.imageMapList && <BoardCarousel imageMapList={getBoard?.data.data.imageMapList} />}
          </div>
          <div>
            <div className="board-contents">
              <div className="user-profile-category">
                <div className="user-profile">
                  <div className="user-img">
                    <img
                      src={
                        getBoard?.data.data.accountImageUrl === "default"
                          ? "/img/default_img.png"
                          : getBoard?.data.data.accountImageUrl
                      }
                    />
                  </div>
                  <div className="user-nickname-created">
                    <div className="user-nickname">{getBoard?.data.data.nickname}</div>
                    <div className="user-created">{timeUtils.createdTime(getBoard?.data.data.createdAt)}</div>
                  </div>
                </div>
                <div className="category">
                  <Label size="medium" type="category">
                    {BoardCategory[getBoard?.data.data.category]}
                  </Label>
                </div>
              </div>

              <div className="board-contents-text">
                <div className="board-title-status">
                  <div className="board-title">{getBoard?.data.data.title}</div>
                  <div className="board-status">
                    {getBoard?.data.data.status === "SALE" ? (
                      <Label size="small" type="sale">
                        {BoardStatus[getBoard?.data.data.status]}
                      </Label>
                    ) : (
                      <Label size="small" type="sold-out">
                        {BoardStatus[getBoard?.data.data.status]}
                      </Label>
                    )}
                  </div>
                </div>
                <div className="board-price">{getBoard?.data.data.sellPrice}원</div>
                <div className="board-explain">{getBoard?.data.data.description}</div>
                <div className="board-button"></div>
              </div>
            </div>

            {jwtUtils.isValid(refreshToken) && jwtUtils.getId(refreshToken) === getBoard?.data.data.accountId ? (
              <div className="board-button">
                <div className="button-delete">
                  <Button
                    color="primary"
                    onClick={() => {
                      setModalIsOpen(true);
                    }}
                  >
                    삭제하기
                  </Button>
                </div>
                <div className="button-update">
                  <Button
                    color="primary"
                    onClick={() => {
                      navigate(`/edit-board/${board_id}`);
                    }}
                  >
                    수정하기
                  </Button>
                </div>
              </div>
            ) : (
              <div className="board-button-bookmark">
                {jwtUtils.isValid(refreshToken) ? (
                  getBoard?.data.data.wishIds.filter((id: number) => id === jwtUtils.getId(refreshToken))[0] ? (
                    <div
                      className="button-bookmark-filled"
                      onClick={() => {
                        deleteBookmarkMutation();
                        alert("저장목록에서 제외되었습니다.");
                      }}
                    >
                      <BookMarkIcon />
                    </div>
                  ) : (
                    <div
                      className="button-bookmark"
                      onClick={() => {
                        addBookmarkMutation();
                        alert("저장목록에 추가되었습니다.");
                      }}
                    >
                      <BookMarkIcon />
                    </div>
                  )
                ) : (
                  <div
                    className="button-bookmark"
                    onClick={() => {
                      alert("로그인이 필요합니다");
                    }}
                  >
                    <BookMarkIcon />
                  </div>
                )}
                <div className="button-message">
                  <Button color="primary">판매자에게 1:1 채팅 보내기</Button>
                </div>
              </div>
            )}
          </div>

          <DeleteBoardModal
            board_id={Number(board_id)}
            board_title={getBoard?.data.data.title}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      )}
    </div>
  );
};
export default Board;
