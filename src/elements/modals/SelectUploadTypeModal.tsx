import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/elements/modals/selectuploadtypemodal.scss";
import { IconButton } from "../IconButton";
import { CameraIcon, ImageIcon } from "../../assets/icons/FigmaIcons";
import { useState } from "react";
import { Button } from "../Button";
import FileUploader from "../../components/fileUploader/FileUploader";
interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: any;
  setValues: any;
}

const SelectUploadTypeModal = ({ modalIsOpen, setModalIsOpen, setValues }: ModalProps) => {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState<boolean>(false);
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState<boolean>(false);
  return (
    <>
      <FileUploader />
      <Dialog
        open={uploadModalIsOpen}
        onClose={() => {
          setUploadModalIsOpen(false);
        }}
      >
        <div className="modal-select-type">
          <DialogTitle>사진과 동영상중 선택하세요</DialogTitle>
          <DialogContent>
            <div className="modal-body">
              <div className="select-button">
                <Button
                  onClick={() => {
                    setUploadModalIsOpen(false);
                  }}
                >
                  사진
                </Button>
              </div>
              <div className="select-button">
                <Button
                  onClick={() => {
                    setUploadModalIsOpen(false);
                  }}
                >
                  동영상
                </Button>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="modal-select-type">
          <DialogTitle>업로드는 어떤걸로 해볼까요?</DialogTitle>
          <DialogContent>
            <div className="modal-body">
              <div className="select-button">
                <IconButton icon={<CameraIcon />} direction="top-bottom" iconSize="large">
                  직접
                  <br />
                  촬영할게요
                </IconButton>
              </div>
              <div className="select-button">
                <FileUploader />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};
export default SelectUploadTypeModal;
