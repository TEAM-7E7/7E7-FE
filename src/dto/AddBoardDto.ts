export interface FileDto {
  preview_URL: string;
  type: string;
}

export interface BoardDto {
  title: string;
  category: string;
  price: string;
  explain: string;
  files: FileDto[];
}
