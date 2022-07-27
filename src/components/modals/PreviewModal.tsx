import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/components/modals/previewmodal.scss";
import { Video } from "../../elements/Video";
interface PreviewModalDto {
  modalIsOpen: boolean;
  setModalIsOpen: any;
  previewURL: string;
  type: string;
}

const PreviewModal = function PreviewTypeModal({ modalIsOpen, setModalIsOpen, previewURL, type }: PreviewModalDto) {
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
              {type === "video" ? <Video autoPlay={true} src={previewURL} /> : <img src={previewURL} />}
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewModal;
