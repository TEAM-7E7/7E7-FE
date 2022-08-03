import { Dialog, DialogContent } from "@mui/material";
import { instanceWithToken } from "../../api/api";
import { Button } from "../../elements/Button";
import "../../styles/components/modals/deleteboardmodal.scss";
interface DeleteBoardModalDto {
  board_id: number;
  board_title: string;
  modalIsOpen: boolean;
  setModalIsOpen: any;
}

const DeleteBoardModal = function DeleteBoardModal({
  board_id,
  board_title,
  modalIsOpen,
  setModalIsOpen,
}: DeleteBoardModalDto) {
  const deleteBoard = async () => {
    const res = await instanceWithToken.delete(`/api/goods/${board_id}`);
    console.log(res);
    alert("게시물이 삭제되었습니다.");
    //window.location.href = "/my-page";
  };
  return (
    <>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="modal-delete-board">
          <DialogContent>
            <div className="modal-body">
              <div className="modal-body-text">
                <span className="modal-body-text-highlight">{board_title}</span>
                <br />
                정말 삭제하시겠습니까?
              </div>
              <div className="modal-body-button">
                <Button
                  color="skyblue"
                  size="medium"
                  onClick={() => {
                    setModalIsOpen(false);
                  }}
                >
                  취소하기
                </Button>
                <Button color="primary" size="medium" onClick={deleteBoard}>
                  삭제하기
                </Button>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteBoardModal;
