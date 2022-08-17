export interface MyPageBoardCategoryDto {
  boardCategory: string | "sell" | "buy" | "bookmark";
}

export interface KebabMenuDto {
  board_id: number;
  board_title: string;
  board_status: string;
}

export interface MyBoardListDto {
  accountImageUrl: string;
  category: string;
  createdAt: string;
  goodsImageUrl: string;
  id: number;
  nickname: string;
  sellPrice: number;
  status: string;
  title: string;
}
