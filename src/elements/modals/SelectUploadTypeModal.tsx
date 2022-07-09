import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/elements/modals/selectuploadtypemodal.scss";
import { IconButton } from "../IconButton";
import { CameraIcon, ImageIcon } from "../../assets/icons/FigmaIcons";
import { memo, useState } from "react";
import FileUploader from "../../components/FileUploader";
import { BoardDto } from "../../dto/AddBoardDto";

interface SelectUploadTypeModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: any;
  setValues: any;
  values: BoardDto;
}

const SelectUploadTypeModal = function SelectUploadTypeModal({
  modalIsOpen,
  setModalIsOpen,
  setValues,
  values,
}: SelectUploadTypeModalProps) {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState<boolean>(false);
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState<boolean>(false);
  return (
    <>
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
                {/* 유저가 직접 업로드하는 파일 업로더 */}
                <FileUploader values={values} setValues={setValues} />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default SelectUploadTypeModal;
