import { AddBoardAndEditBoardDto } from "./AddBoardAndEditBoardDto";

export interface DeleteBoardModalDto {
  board_id: number;
  board_title: string;
  modalIsOpen: boolean;
  setModalIsOpen: (modalIsOpen: boolean) => void;
}

export interface NicknameChangeModalDto {
  open: boolean;
  handleClose: () => void;
  reloadToken: () => void;
}

export interface PasswordChangeModalDto {
  open: boolean;
  handleClose: () => void;
}

export interface PreviewModalDto {
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  previewURL: string;
  fileType: string;
}

export interface ResignModalDto {
  open: boolean;
  handleClose: () => void;
}

export interface SelectUploadTypeModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  setValues: any;
  values: AddBoardAndEditBoardDto;
}

export interface VerifyEmailModalDto {
  userEmail: string;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
  onSetEmailIsVerified: () => void;
  url: string;
}
