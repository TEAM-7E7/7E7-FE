import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../styles/components/chatting.scss";
import { jwtUtils } from "../utils/jwtUtils";
import React, { useEffect, useRef, useState } from "react";
import { instanceWithToken } from "../api/api";
import { Cookies } from "react-cookie";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Input } from "../elements/Input";
import { Button } from "../elements/Button";
import { GoBackIcon } from "../assets/icons/FigmaIcons";

interface ChattingModalDto {
  userId?: number | null;
  boardId?: number | null;
  chattingIsOpen: boolean;
  setChattingIsOpen: any;
}

interface CurrentChatDto {
  chatRoomId: string;
  messages: any;
}

const Chatting = ({ userId = null, boardId = null, chattingIsOpen, setChattingIsOpen }: ChattingModalDto) => {
  console.log(userId, boardId);
  const socket = new SockJS("https://tryaz.shop/api/ws");
  const client = Stomp.over(socket);
  // 내 id, nickname 가져오기
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  const myId = jwtUtils.getId(accessToken);
  const myNickname = jwtUtils.getNickname(accessToken);
  // 모든 채팅 방 리스트
  const [allChatList, setAllChatList] = useState<any>([]);
  // 현재 채팅의 boardId, 채팅(채팅 방 id, message), partner id
  const [currentBoardId, setCurrentBoardId] = useState<number | null>(boardId);
  const [currentChat, setCurrentChat] = useState<CurrentChatDto>({
    chatRoomId: "",
    messages: [],
  });
  const [currentPartnerId, setCurrentPartnerId] = useState<number | null>(userId);
  const messageRef = useRef<HTMLInputElement>(null);

  const getAllChatList = async () => {
    await instanceWithToken.get("/api/chat-rooms").then((result) => setAllChatList(result.data));
  };

  const getCurrentChat = async () => {
    if (boardId && myId !== userId) {
      await instanceWithToken
        .post("/api/chat-message-list", { goodsId: currentBoardId })
        .then((result) => {
          setCurrentChat(result.data);
        })
        .catch(async () => {
          const currentTime = Date.now();
          const newChatRoomId = currentTime.toString() + myNickname;

          await instanceWithToken.post("https://tryaz.shop/api/room", {
            id: newChatRoomId,
            goodsId: currentBoardId,
          });
          setCurrentChat({
            chatRoomId: newChatRoomId,
            messages: [],
          });
        });
    }
  };
  const changeCurrentChat = async (newBoardId: number, newPartnerId: number) => {
    await instanceWithToken.post("/api/chat-message-list", { goodsId: boardId }).then((result) => {
      setCurrentChat(() => result.data);
      setCurrentBoardId(() => newBoardId);
      setCurrentPartnerId(() => newPartnerId);
    });
  };

  const refreshCurrentChat = async () => {
    await instanceWithToken.post("/api/chat-message-list", { goodsId: boardId }).then((result) => {
      setCurrentChat(result.data);
    });
  };

  const sendMessage = () => {
    const newMessage = {
      goodsId: currentBoardId,
      chatRoomId: currentChat.chatRoomId,
      senderId: myId,
      partnerId: currentPartnerId,
      message: messageRef?.current?.value,
      createdAt: new Date(),
    };
    client.send("/pub/chat/message", {}, JSON.stringify(newMessage));
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };
  useEffect(() => {
    if (chattingIsOpen) {
      getAllChatList();
      getCurrentChat();
      client.connect({}, () => {
        client.subscribe(`/sub/my-rooms/${myId}`, () => {
          getAllChatList();
          refreshCurrentChat();
        });
      });
    }
  }, [chattingIsOpen]);

  return (
    <>
      {chattingIsOpen && (
        <div className="chatting">
          <div className="chatting-wrapper">
            <div className="chatting-list-wrapper">
              <div className="close-button-text">
                <div
                  className="close-button"
                  onClick={() => {
                    setChattingIsOpen(false);
                  }}
                >
                  <GoBackIcon />
                </div>
                <div className="text">채팅</div>
              </div>
              <div className="chatting-list-body">
                {allChatList?.map((item: any, index: number) => (
                  <div
                    className={`chatting-list-item ${
                      currentChat.chatRoomId === item.chatRoomId ? "chatting-selected" : ""
                    }`}
                    key={item.chatRoomId}
                    onClick={() => {
                      changeCurrentChat(item.goodsId, item.partnerId);
                    }}
                  >
                    <div className="chatting-profile-img">
                      {item.partnerProfileUrl === "default" ? (
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.3333 12C15.6483 12 18.3333 9.315 18.3333 6C18.3333 2.685 15.6483 0 12.3333 0C9.01834 0 6.33334 2.685 6.33334 6C6.33334 9.315 9.01834 12 12.3333 12ZM12.3333 15C8.32834 15 0.333344 17.01 0.333344 21V22.5C0.333344 23.325 1.00834 24 1.83334 24H22.8333C23.6583 24 24.3333 23.325 24.3333 22.5V21C24.3333 17.01 16.3383 15 12.3333 15Z"
                            fill="#EBEEEF"
                          />
                        </svg>
                      ) : (
                        <img alt={item.partner} src={item.partnerProfileUrl} />
                      )}
                    </div>
                    <div className="chatting-text">
                      <div className="chatting-partner">{item.partner}</div>
                      <div className="chatting-last-time">{item.lastDate}</div>
                      <div className="chatting-last-message">{item.lastMessage}</div>
                    </div>
                    <div className="chatting-board-img">
                      <img src={item.goodsFileUrl} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chatting-current-wrapper">
              <div className="chatting-current-list">
                {currentChat?.messages?.map((item: any, index: number) => {
                  if (item.senderNickName === myNickname) {
                    return (
                      <div className="chatting-current-mine" key={index}>
                        {item.message}
                      </div>
                    );
                  } else {
                    return (
                      <div className="chatting-current-partner" key={index}>
                        {item.message}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="chatting-send-input-button">
                <div className="chatting-send-input">
                  <Input ref={messageRef} placeholder="메세지를 입력해보세요." />
                </div>
                <div className="chatting-send-button">
                  <Button color="primary" onClick={sendMessage}>
                    전송
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatting;
