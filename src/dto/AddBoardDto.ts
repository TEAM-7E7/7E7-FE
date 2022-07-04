export interface FileDto {
  fileObject: File | null;
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
