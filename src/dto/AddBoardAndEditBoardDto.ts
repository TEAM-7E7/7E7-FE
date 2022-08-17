export interface FileDto {
  preview_URL: string;
  file_id: number;
  type: string;
}

export interface AddBoardAndEditBoardDto {
  title: string;
  category: string;
  price: string;
  explain: string;
  files: FileDto[];
}

export interface DndContainerDto {
  values: AddBoardAndEditBoardDto;
  setValues: (values: AddBoardAndEditBoardDto) => void;
}

export interface DndItemDto {
  fileType: string;
  id: string;
  findItem: (id: string) => { item: FileDto; index: number };
  moveItem: (id: string, atIndex: number) => void;
  values: AddBoardAndEditBoardDto;
  setValues: (values: AddBoardAndEditBoardDto) => void;
}

export interface FileUploaderDto {
  values: AddBoardAndEditBoardDto;
  setValues: (values: AddBoardAndEditBoardDto) => void;
  setModalIsOpen: (idOpen: boolean) => void;
}

export interface ImageMapDto {
  id: number;
  url: string;
}
