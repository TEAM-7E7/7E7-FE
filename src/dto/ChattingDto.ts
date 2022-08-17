export interface CurrentChatDto {
  buyerId: number;
  sellerId: number;
  chatRoomId: string;
  goodsId: number;
  goodsTitle: string;
  myProfileUrl: string;
  partnerNickname: string;
  partnerProfileUrl: string;
  sellStatus: string;
  messages: string[];
}
