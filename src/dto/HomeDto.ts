export interface CategoryItemOptions {
  name: string;
  value: string;
}

export interface ScrollSnapItemDto {
  userNickname: string;
  userImageUrl: string;
  fileType: string;
  fileUrl: string;
  scrollRef?: any;
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
  sellPrice: number;
  autoPlay: boolean;
  viewCount: number;
  wishIds: string[];
}
