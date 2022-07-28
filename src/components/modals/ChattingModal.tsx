import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/components/modals/chattingmodal.scss";
import { jwtUtils } from "../../utils/jwtUtils";
import { useEffect, useRef, useState } from "react";
import { instanceWithToken } from "../../api/api";
import { Cookies } from "react-cookie";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";

interface ChattingModalDto {
  userId?: number | null;
  boardId?: number | null;
  modalIsOpen: boolean;
  setModalIsOpen: any;
}

interface CurrentChatDto {
  chatRoomId: string;
  messages: any;
}

const ChattingModal = function ChattingModal({
  userId = null,
  boardId = null,
  modalIsOpen,
  setModalIsOpen,
}: ChattingModalDto) {
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
  const [partnerId, setPartnerId] = useState<number | null>(userId);

  const messageRef = useRef<HTMLInputElement>(null);

  const getAllChatList = async () => {
    await instanceWithToken.get("/api/chat-rooms").then((result) => setAllChatList(result.data));
  };

  const getCurrentChat = async () => {
    if (currentBoardId) {
      await instanceWithToken
        .post("/api/chat-message-list", { goodsId: currentBoardId })
        .then((result) => {
          setCurrentChat(result.data);
        })
        .catch(async () => {
          console.log(1);
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

  useEffect(() => {
    getAllChatList();
    getCurrentChat();
    client.connect({}, () => {
      client.subscribe(`/sub/my-rooms/${myId}`, () => {
        getAllChatList();
        getCurrentChat();
      });
    });
  }, []);

  return (
    <>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="modal-chatting">
          <div className="chat-list-wrapper">
            {allChatList?.map((item: any, index: number) => (
              <div className="chat-list-body" key={index}>
                <div className="chat-partner">{item.partner}</div>
                <div className="chat-goods">{item.goodsId}</div>
                <div className="chat-last-message">{item.lastMessage}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-current-wrapper">
          <div className="chat-current-list">
            {currentChat?.messages?.map((item: any, index: number) => {
              if (item.senderNickName === myNickname) {
                return (
                  <div className="chat-current-partner" key={index}>
                    {item.message}
                  </div>
                );
              } else {
                return <div className="chat-current-partner">{item.message}</div>;
              }
            })}
          </div>
          <div className="chat-send-input-button">
            <div className="chat-send-input">
              <Input ref={messageRef} />
            </div>
            <div className="chat-send-button">
              <Button
                color="primary"
                onClick={() => {
                  const newMessage = {
                    goodsId: currentBoardId,
                    chatRoomId: currentChat.chatRoomId,
                    senderId: myId,
                    partnerId: partnerId,
                    message: messageRef?.current?.value,
                  };
                }}
              >
                보내기
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ChattingModal;
