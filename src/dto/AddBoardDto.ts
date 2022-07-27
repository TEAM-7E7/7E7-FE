export interface FileDto {
  preview_URL: string;
  file_id: number;
  type: string;
}

export interface AddBoardDto {
  title: string;
  category: string;
  price: string;
  explain: string;
  files: FileDto[];
}
