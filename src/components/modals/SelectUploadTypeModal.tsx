import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/components/modals/selectuploadtypemodal.scss";
import { IconButton } from "../../elements/IconButton";
import { CameraIcon, ImageIcon } from "../../assets/icons/FigmaIcons";
import { useState } from "react";
import FileUploader from "../FileUploader";
import { SelectUploadTypeModalProps } from "../../dto/ModalDto";

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
          <DialogTitle>
            <div className="modal-select-type-title">업로드는 어떤걸로 해볼까요?</div>
            <div className="modal-about-video-text">영상의 길이는 최대 16초입니다!</div>
          </DialogTitle>
          <DialogContent>
            <div className="modal-body">
              {/*<div className="select-button">
                <IconButton icon={<CameraIcon />} direction="top-bottom" iconSize="large">
                  직접
                  <br />
                  촬영할게요
                </IconButton>
              </div>*/}
              <div className="select-button">
                {/* 유저가 직접 업로드하는 파일 업로더 */}
                <FileUploader values={values} setValues={setValues} setModalIsOpen={setModalIsOpen} />
              </div>
            </div>
            <p className="modal-helper-text">이미지 확장자: .jpg, .png, .jpeg, gif, .svg</p>
            <p className="modal-helper-text">영상 확장자: .mp4, .m4v, .avi, .wmv, .mwa, .asf, .mpg, .mpeg, .mkv</p>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default SelectUploadTypeModal;
