import "../styles/pages/chatting.scss";
import { jwtUtils } from "../utils/jwtUtils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { instanceWithToken } from "../api/api";
import { Cookies } from "react-cookie";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { Input } from "../elements/Input";
import { Button } from "../elements/Button";
import { GoBackIcon, HamburgerIcon } from "../assets/icons/FigmaIcons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { timeUtils } from "../utils/timeUtils";
import MetaTag from "../utils/MetaTag";

interface CurrentChatDto {
  buyerId: number;
  sellerId: number;
  chatRoomId: string;
  goodsId: number;
  goodsTitle: string;
  myProfileUrl: string;
  partnerNickname: string;
  partnerProfileUrl: string;
  sellStatus: string;
  messages: any;
}

const Chatting = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("board_id");
  const userId = searchParams.get("user_id");
  const client = useRef<any>({});
  const [isConnect, setIsConnect] = useState<boolean>(false);
  // 내 id, nickname 가져오기
  const cookies = new Cookies();
  const accessToken = cookies.get("X-ACCESS-TOKEN");
  const myId = jwtUtils.getId(accessToken);
  const myNickname = jwtUtils.getNickname(accessToken);
  // 모든 채팅 방 리스트
  const [allChatList, setAllChatList] = useState<any>([]);
  // 현재 채팅의 boardId, 채팅(채팅 방 id, message), partner id
  const [currentChat, setCurrentChat] = useState<CurrentChatDto>({
    chatRoomId: "",
    sellerId: 0,
    buyerId: 0,
    goodsId: 0,
    goodsTitle: "",
    myProfileUrl: "",
    partnerNickname: "",
    partnerProfileUrl: "",
    sellStatus: "",
    messages: [],
  });
  const [chatListIsOpen, setChatListIsOpen] = useState<boolean>(false);
  const messageRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  const getAllChatList = async () => {
    await instanceWithToken.get("/api/chat-rooms").then((result) => setAllChatList(result.data));
  };

  const getCurrentChat = async () => {
    if (boardId && myId !== userId) {
      await instanceWithToken
        .post("/api/chat-message-list", { goodsId: boardId, partnerId: userId })
        .then((result) => {
          setCurrentChat(result.data);
        })
        .catch(async (err) => {
          if (err.response.data.code === "CHAT_ROOM_NOT_FOUND") {
            const currentTime = Date.now();
            const newChatRoomId = currentTime.toString() + myNickname;
            await instanceWithToken
              .post("https://tryaz.shop/api/room", {
                id: newChatRoomId,
                goodsId: boardId,
              })
              .then(() => {
                client.current.publish({
                  destination: "/pub/chat/message",
                  body: JSON.stringify({
                    goodsId: boardId,
                    chatRoomId: newChatRoomId,
                    senderId: myId,
                    partnerId: userId,
                    message: "marketclipchatstarter",
                    createdAt: new Date(),
                  }),
                });
              })
              .catch((err) => {
                console.log(err);
                alert(err.response.data.message);
                navigate("/chatting", { replace: true });
              });
          }
        });
    }
  };

  const refreshCurrentChat = async () => {
    if (boardId && userId) {
      await instanceWithToken.post("/api/chat-message-list", { goodsId: boardId, partnerId: userId }).then((result) => {
        setCurrentChat(result.data);
      });
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const stompConnect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("https://tryaz.shop/api/ws"),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        stompSubscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    client.current.activate();
  };
  const stompSubscribe = () => {
    client.current.subscribe(`/sub/my-rooms/${myId}`, (message: any) => {
      console.log(message);
      if (message.body.includes("PARTNER_EXIT") && message.body.split("_").at(0) === boardId) {
        alert("상대방이 채팅방에서 나갔습니다.");
        navigate("/chatting", { replace: true });
      } else if (message.body.includes("TRADE_CALL_SELLER") && message.body.split("_").at(0) === boardId) {
        alert("거래를 신청했습니다!");
      } else if (message.body.includes("TRADE_CALL_BUYER")) {
        alert("거래 요청이 도착했습니다!");
      } else if (message.body.includes("TRADE_SUCCESS_SELLER") && message.body.split("_").at(0) === boardId) {
        alert("거래가 완료되었습니다!");
      } else if (message.body.includes("TRADE_SUCCESS_BUYER") && message.body.split("_").at(0) === boardId) {
        alert("거래가 완료되었습니다!");
      } else if (message.body.includes("TRADE_FAIL_SELLER") && message.body.split("_").at(0) === boardId) {
        alert("상대방이 거래를 취소했습니다!");
      } else if (message.body.includes("TRADE_FAIL_BUYER")) {
        alert("거래를 취소했습니다!");
      }

      refreshCurrentChat();
      getAllChatList();
    });
    getCurrentChat();
    getAllChatList();
    setIsConnect(true);
  };

  const sendMessage = () => {
    const newMessage = {
      goodsId: boardId,
      chatRoomId: currentChat.chatRoomId,
      senderId: myId,
      partnerId: userId,
      message: messageRef?.current?.value,
      createdAt: new Date(),
    };
    if (messageRef.current) {
      if (messageRef.current.value !== "") {
        if (messageRef.current.value.length > 50) {
          alert("메시지는 최대 50자까지 보낼 수 있습니다.");
        } else {
          client.current.publish({ destination: "/pub/chat/message", body: JSON.stringify(newMessage) });
          messageRef.current.value = "";
        }
      }
    }
  };

  useEffect(() => {
    stompConnect();
    return () => {
      client.current.deactivate();
      setIsConnect(false);
    };
  }, [boardId, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  return (
    <div className="chatting">
      <MetaTag title="Chatting" description="실시간 채팅을 즐겨보세요!" />
      <div className="chatting-wrapper">
        <div
          className="open-chatting-list-button"
          onClick={() => {
            if (chatListIsOpen) {
              setChatListIsOpen(false);
            } else {
              setChatListIsOpen(true);
            }
          }}
        >
          <HamburgerIcon />
        </div>
        <div className={`chatting-list-wrapper ${chatListIsOpen && "chatting-list-wrapper-is-open"}`}>
          <div className="chatting-list-body">
            <div className="close-button-text">
              <div
                className="close-button"
                onClick={() => {
                  if (!boardId || !userId) {
                    navigate("/");
                  } else {
                    navigate(`/board/${boardId}`);
                  }
                }}
              >
                <GoBackIcon />
              </div>
              <div className="text">채팅</div>
            </div>
            <div className="chatting-list-items">
              {allChatList?.map((item: any) => (
                <div
                  className={`chatting-list-item ${
                    currentChat.chatRoomId === item.chatRoomId ? "chatting-selected" : ""
                  }`}
                  key={item.chatRoomId}
                  onClick={() => {
                    navigate(`/chatting?board_id=${item.goodsId}&user_id=${item.partnerId}`);
                    setChatListIsOpen(false);
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
                    <div className="chatting-partner">
                      <div className="chatting-partner-name">{item.partner}</div>
                      {item.checkReadCnt !== 0 && item.chatRoomId !== currentChat.chatRoomId && (
                        <div className="chatting-partner-unread">{item.checkReadCnt}</div>
                      )}
                    </div>
                    <div className="chatting-last-time">{timeUtils.timePass(item.lastDate)}</div>
                    <div className="chatting-last-message">{item.lastMessage}</div>
                  </div>
                  <div className="chatting-board-img">
                    {item.goodsFileUrl.split(".").at(-1) === "mp4" ? (
                      <video src={item.goodsFileUrl} />
                    ) : (
                      <img src={item.goodsFileUrl} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {boardId && userId ? (
          <div className="chatting-current-wrapper">
            <div className="chatting-current-header">
              <div className="chatting-current-header-text">
                <div className="chatting-current-partner-nickname">{currentChat.partnerNickname}</div>
                <div className="chatting-current-partner-board">{currentChat.goodsTitle}</div>
              </div>
              <div className="chatting-button">
                {currentChat.sellStatus === "SELLER_TRY" && (
                  <Button
                    size="small"
                    onClick={async () => {
                      const requestBody = {
                        goodsId: boardId,
                        buyerId: currentChat.buyerId,
                        sellerId: currentChat.sellerId,
                        chatRoomId: currentChat.chatRoomId,
                      };
                      await instanceWithToken.post("/api/review/deal", requestBody);
                      const tradeMessage = {
                        goodsId: boardId,
                        chatRoomId: currentChat.chatRoomId,
                        senderId: myId,
                        partnerId: userId,
                        message: "거래 요청이 도착했습니다!",
                        createdAt: new Date(),
                      };
                      client.current.publish({ destination: "/pub/chat/message", body: JSON.stringify(tradeMessage) });
                    }}
                  >
                    거래요청
                  </Button>
                )}
                {currentChat.sellStatus === "TRADE_WAITING" && (
                  <Button size="small" onClick={() => alert("이미 거래중인 게시물입니다.")}>
                    거래요청
                  </Button>
                )}
                {currentChat.sellStatus === "BUYER_CHECK_REQUEST" && (
                  <>
                    <Button
                      size="small"
                      onClick={async () => {
                        const requestBody = {
                          goodsId: boardId,
                          buyerId: currentChat.buyerId,
                          sellerId: currentChat.sellerId,
                          chatRoomId: currentChat.chatRoomId,
                          status: true,
                        };
                        await instanceWithToken.put("/api/review/ok", requestBody).then(() => {
                          const tradeMessage = {
                            goodsId: boardId,
                            chatRoomId: currentChat.chatRoomId,
                            senderId: myId,
                            partnerId: userId,
                            message: "거래 요청이 수락되었습니다!",
                            createdAt: new Date(),
                          };
                          client.current.publish({
                            destination: "/pub/chat/message",
                            body: JSON.stringify(tradeMessage),
                          });
                        });
                      }}
                    >
                      수락
                    </Button>
                    <Button
                      size="small"
                      onClick={async () => {
                        const requestBody = {
                          goodsId: boardId,
                          buyerId: currentChat.buyerId,
                          sellerId: currentChat.sellerId,
                          chatRoomId: currentChat.chatRoomId,
                          status: false,
                        };
                        console.log(requestBody);
                        await instanceWithToken.put("/api/review/ok", requestBody).then(() => {
                          const tradeMessage = {
                            goodsId: boardId,
                            chatRoomId: currentChat.chatRoomId,
                            senderId: myId,
                            partnerId: userId,
                            message: "거래 요청이 취소되었습니다ㅠㅠ",
                            createdAt: new Date(),
                          };
                          client.current.publish({
                            destination: "/pub/chat/message",
                            body: JSON.stringify(tradeMessage),
                          });
                        });
                      }}
                    >
                      취소
                    </Button>
                  </>
                )}
                <Button
                  size="small"
                  color="skyblue"
                  variant="outlined"
                  onClick={async () => {
                    const deleteChattingRequestBody: any = {
                      goodsId: boardId,
                      buyerId: currentChat.buyerId,
                    };
                    await instanceWithToken
                      .delete("/api/room", {
                        data: deleteChattingRequestBody,
                      })
                      .then(() => {
                        alert("채팅방이 삭제되었습니다!");
                        navigate("/chatting", { replace: true });
                      })
                      .catch(() => {
                        alert("채팅방을 삭제할 수 없습니다.");
                      });
                  }}
                >
                  채팅방 나가기
                </Button>
              </div>
            </div>
            <div className="chatting-current-list">
              <div className="chatting-start-message">
                채팅이 시작되었어요! <br /> 배려하는 마음으로 즐거운 거래를 시작해보세요!
              </div>
              {currentChat?.messages?.map((item: any, index: number) => {
                if (index !== 0) {
                  if (item.senderNickname === myNickname) {
                    return (
                      <div className="chatting-current-mine" key={index} ref={scrollRef}>
                        <div className="chatting-mine">{item.message}</div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="chatting-current-partner" key={index} ref={scrollRef}>
                        <div className="chatting-partner-img">
                          {currentChat.partnerProfileUrl === "default" ? (
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.3333 12C15.6483 12 18.3333 9.315 18.3333 6C18.3333 2.685 15.6483 0 12.3333 0C9.01834 0 6.33334 2.685 6.33334 6C6.33334 9.315 9.01834 12 12.3333 12ZM12.3333 15C8.32834 15 0.333344 17.01 0.333344 21V22.5C0.333344 23.325 1.00834 24 1.83334 24H22.8333C23.6583 24 24.3333 23.325 24.3333 22.5V21C24.3333 17.01 16.3383 15 12.3333 15Z"
                                fill="#EBEEEF"
                              />
                            </svg>
                          ) : (
                            <img src={currentChat.partnerProfileUrl} />
                          )}
                        </div>
                        <div className="chatting-partner">{item.message}</div>
                      </div>
                    );
                  }
                }
              })}
              {currentChat.sellStatus === "SOLD_OUT" && (
                <div className="chatting-start-message">거래가 완료된 게시물입니다!</div>
              )}
            </div>
            {isConnect && (
              <div className="chatting-send-input-button">
                <div className="chatting-send-input">
                  <Input
                    ref={messageRef}
                    placeholder={
                      currentChat.sellStatus === "SOLD_OUT" ? "거래가 완료된 게시물입니다." : "메세지를 입력해보세요."
                    }
                    onKeyPress={handleOnKeyPress}
                    disabled={currentChat.sellStatus === "SOLD_OUT"}
                    onClick={() => {
                      if (currentChat.sellStatus === "SOLD_OUT") {
                        alert("거래가 완료된 게시물입니다!");
                      }
                    }}
                    fullWidth
                  />
                </div>
                <div className="chatting-send-button">
                  <Button color="primary" onClick={sendMessage} disabled={currentChat.sellStatus === "SOLD_OUT"}>
                    전송
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="select-chatting-text">채팅 목록에서 상대를 선택해주세요!</div>
        )}
      </div>
    </div>
  );
};

export default Chatting;
