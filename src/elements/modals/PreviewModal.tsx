import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/elements/modals/selectuploadtypemodal.scss";
import { memo } from "react";

interface PreviewModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: any;
  previewURL: string;
  type: string;
}

const PreviewModal = memo(function PreviewTypeModal({
  modalIsOpen,
  setModalIsOpen,
  previewURL,
  type,
}: PreviewModalProps) {
  return (
    <>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="modal-select-type">
          <DialogTitle>미리보기</DialogTitle>
          <DialogContent>
            <div className="modal-body">
              {type === "video" ? <video autoPlay={true} controls={true} src={previewURL} /> : <img src={previewURL} />}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
});

export default PreviewModal;
