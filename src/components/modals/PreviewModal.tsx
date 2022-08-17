import { Dialog, DialogContent } from "@mui/material";
import "../../styles/components/modals/previewmodal.scss";
import { Video } from "../../elements/Video";
import { PreviewModalDto } from "../../dto/ModalDto";

const PreviewModal = function PreviewModal({ modalIsOpen, setModalIsOpen, previewURL, fileType }: PreviewModalDto) {
  return (
    <>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="modal-preview">
          <DialogContent>
            <div className="modal-body">
              {fileType === "video" ? <Video autoPlay={true} src={previewURL} /> : <img src={previewURL} />}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewModal;
