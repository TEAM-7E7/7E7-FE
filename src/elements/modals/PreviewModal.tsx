import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "../../styles/elements/modals/previewmodal.scss";
import { Video } from "../Video";
interface PreviewModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: any;
  previewURL: string;
  type: string;
}

const PreviewModal = function PreviewTypeModal({ modalIsOpen, setModalIsOpen, previewURL, type }: PreviewModalProps) {
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
