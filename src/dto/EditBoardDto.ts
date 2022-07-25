export interface FileDto {
  preview_URL: string;
  file_id: number;
  type: string;
}

export interface EditBoardDto {
  title: string;
  category: string;
  price: string;
  explain: string;
  files: FileDto[];
  status: string;
}
