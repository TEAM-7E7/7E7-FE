import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Input } from "../Input";
import { useRef } from "react";
import axios from "axios";
import { Button } from "../Button";
import "../../styles/elements/modals/verfiyemailmodal.scss";

interface VerifyEmailModalDto {
  userEmail: string;
  modalIsOpen: boolean;
  setModalIsOpen: any;
  setEmailIsVerified: any;
}

const VerifyEmailModal = function SelectUploadTypeModal({
  userEmail,
  modalIsOpen,
  setModalIsOpen,
  setEmailIsVerified,
}: VerifyEmailModalDto) {
  const emailTokenRef = useRef<HTMLInputElement>(null);
  const verifyEmail = async () => {
    const verifyEmailRequestBody = {
      email: userEmail,
      emailToken: emailTokenRef.current?.value,
    };
    try {
      await axios.post("https://tryaz.shop/api/email-validation", verifyEmailRequestBody);
      alert("이메일 인증이 완료되었습니다.");
      setEmailIsVerified(true);
      setModalIsOpen(false);
    } catch (e) {
      alert(`인증번호가 일치하지 않습니다.`);
    }
  };
  return (
    <>
      <Dialog
        open={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      >
        <div className="modal-verify-email">
          <DialogContent>
            <div className="modal-body">
              <div className="modal-body-text">
                <span className="modal-body-text-highlight">{userEmail}</span>으로
                <br />
                이메일 인증코드가 발송되었어요.
                <br />
                10분 안에 인증 코드를 입력해주세요.
              </div>
              <div className="modal-body-input-button">
                <div className="modal-body-input">
                  <Input ref={emailTokenRef} fullWidth />
                </div>
                <div className="modal-body-button">
                  <Button
                    color="submit"
                    onClick={() => {
                      verifyEmail();
                    }}
                    fullWidth
                  >
                    인증하기
                  </Button>
                </div>
              </div>
              <div className="modal-body-resend-text">
                인증코드를 받지 못했나요?&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="modal-body-resend-text-underline">인증코드 재전송</span>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default VerifyEmailModal;
