import "../styles/pages/board.scss";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../elements/Button";
import { timeUtils } from "../utils/timeUtils";
import BoardCarousel from "../components/BoardCarousel";
import { useBoardQuery } from "../react-query/query/useBoardQuery";
import { jwtUtils } from "../utils/jwtUtils";
import DeleteBoardModal from "../components/modals/DeleteBoardModal";
import { useRefreshToken } from "../recoil/store";
import { BoardCategory, BoardStatus } from "../dto/BoardCategoryAndState";
import Label from "../elements/Label";
import { BookMarkIcon, ChatIcon, ViewIcon } from "../assets/icons/FigmaIcons";
import { IconButton } from "../elements/IconButton";
import MetaTag from "../utils/MetaTag";
import numeral from "numeral";

const Board = () => {
  const navigate = useNavigate();
  const { refreshToken } = useRefreshToken();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { board_id } = useParams();
  const { getBoard, getBoardIsSuccess, addBookmarkMutation, deleteBookmarkMutation } = useBoardQuery(board_id);
  return (
    <>
      <MetaTag title="게시물 상세보기" description={getBoard?.data.data.description} />
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
                      {getBoard?.data.data.accountImageUrl === "default" ? (
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.3333 12C15.6483 12 18.3333 9.315 18.3333 6C18.3333 2.685 15.6483 0 12.3333 0C9.01834 0 6.33334 2.685 6.33334 6C6.33334 9.315 9.01834 12 12.3333 12ZM12.3333 15C8.32834 15 0.333344 17.01 0.333344 21V22.5C0.333344 23.325 1.00834 24 1.83334 24H22.8333C23.6583 24 24.3333 23.325 24.3333 22.5V21C24.3333 17.01 16.3383 15 12.3333 15Z"
                            fill="#EBEEEF"
                          />
                        </svg>
                      ) : (
                        <img alt={getBoard?.data.data.nickname} src={getBoard?.data.data.accountImageUrl} />
                      )}
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
                      ) : getBoard?.data.data.status === "SOLD_OUT" ? (
                        <Label size="small" type="sold-out">
                          {BoardStatus[getBoard?.data.data.status]}
                        </Label>
                      ) : (
                        <Label size="small" type="reserved">
                          {BoardStatus[getBoard?.data.data.status]}
                        </Label>
                      )}
                    </div>
                  </div>
                  <div className="board-price">{numeral(getBoard?.data.data.sellPrice).format("0,0")}원</div>
                  <div className="board-explain">{getBoard?.data.data.description}</div>
                  <div className="board-wishcount-chatcount">
                    <div className="board-wishcount">
                      <div className="board-wishcount-icon">
                        <BookMarkIcon />
                      </div>
                      {getBoard?.data.data.wishIds.length}
                    </div>
                    <div className="board-chatcount">
                      <div className="board-chatcount-icon">
                        <ChatIcon />
                      </div>
                      {getBoard?.data.data.chatRoomCount}
                    </div>
                  </div>
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
                        if (getBoard?.data.data.status === "SALE") {
                          navigate(`/edit-board/${board_id}`);
                        } else if (getBoard?.data.data.status === "SOLD_OUT") {
                          alert("거래 완료된 게시물은 수정이 불가능합니다!");
                        } else {
                          alert("거래중인 게시물은 수정이 불가능합니다!");
                        }
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
                        <IconButton icon={<BookMarkIcon />} fullWidth>
                          저장취소
                        </IconButton>
                      </div>
                    ) : (
                      <div
                        className="button-bookmark"
                        onClick={() => {
                          addBookmarkMutation();
                          alert("저장목록에 추가되었습니다.");
                        }}
                      >
                        <IconButton icon={<BookMarkIcon />} fullWidth>
                          저장하기
                        </IconButton>
                      </div>
                    )
                  ) : (
                    <div
                      className="button-bookmark"
                      onClick={() => {
                        alert("로그인이 필요합니다");
                      }}
                    >
                      <IconButton icon={<BookMarkIcon />} fullWidth>
                        저장하기
                      </IconButton>
                    </div>
                  )}
                  <div className="button-message">
                    <Button
                      color="primary"
                      onClick={() => {
                        if (jwtUtils.isValid(refreshToken)) {
                          navigate(
                            `/chatting?board_id=${getBoard?.data.data.id}&user_id=${getBoard?.data.data.accountId}`,
                          );
                        } else {
                          alert("로그인이 필요합니다.");
                        }
                      }}
                    >
                      판매자에게 1:1 채팅 보내기
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {jwtUtils.isValid(refreshToken) ? (
        <DeleteBoardModal
          board_id={Number(board_id)}
          board_title={getBoard?.data.data.title}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      ) : null}
    </>
  );
};
export default Board;
