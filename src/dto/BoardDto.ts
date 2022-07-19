export interface BoardDto {
  category: string;
  createdAt: any;
  description: string;
  nickname: string;
  accountImageUrl: string;
  status?: string;
  imageMapList: imageMapDto[];
  id?: number;
  sellPrice: number;
  title: string;
}

interface imageMapDto {
  id: number;
  url: string;
}
