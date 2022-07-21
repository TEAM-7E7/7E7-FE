export interface BoardDto {
  category: string;
  createdAt: any;
  description: string;
  nickname: string;
  accountImageUrl: string;
  status?: string;
  imageMapList: ImageMapDto[];
  id?: number;
  sellPrice: number;
  title: string;
}

export interface ImageMapDto {
  id: number;
  url: string;
}
