import { Dialog } from "@mui/material";
import { Button } from "../../elements/Button";
import "../../styles/components/modals/settingmodal.scss";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { instanceWithToken } from "../../api/api";

interface ResignModalDto {
  open: boolean;
  handleClose: () => void;
}

const ResignModal = function SelectUploadTypeModal({ open, handleClose }: ResignModalDto) {
  const navigate = useNavigate();

  const resign = async () => {
    try {
      await instanceWithToken.delete("https://tryaz.shop/api/user/sign-out");
      toast.success(<h3>탈퇴 처리가 반영되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
        handleClose();
      }, 2000);
    } catch (e: any) {
      // TODO 500 에러가 납니당
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="modal">
      <h3 className="modal-header">회원탈퇴</h3>
      <div className="modal-body">
        <div className="modal-body-text">회원 탈퇴를 진행할 경우 작성된 모든 글이 삭제됩니다.</div>
        <ToastContainer />
        <Button onClick={resign}>탈퇴하기</Button>
      </div>
    </Dialog>
  );
};

export default ResignModal;
