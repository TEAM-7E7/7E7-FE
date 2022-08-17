import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Input } from "../../elements/Input";
import { useRef } from "react";
import axios from "axios";
import { Button } from "../../elements/Button";
import "../../styles/components/modals/verfiyemailmodal.scss";
import { VerifyEmailModalDto } from "../../dto/ModalDto";

const VerifyEmailModal = function VerifyEmailModal({
  userEmail,
  modalIsOpen,
  setModalIsOpen,
  onSetEmailIsVerified,
  url,
}: VerifyEmailModalDto) {
  const emailTokenRef = useRef<HTMLInputElement>(null);
  const verifyEmail = async () => {
    if (emailTokenRef.current?.value === "") {
      alert("인증번호를 입력해주세요");
    } else {
      const verifyEmailRequestBody = {
        email: userEmail,
        emailToken: emailTokenRef.current?.value,
      };
      await axios
        .post(url, verifyEmailRequestBody)
        .then(() => {
          alert("이메일 인증이 완료되었습니다.");
          onSetEmailIsVerified();
          setModalIsOpen(false);
        })
        .catch(() => {
          alert(`인증번호가 일치하지 않습니다.`);
        });
    }
  };
  return (
    <>
      <Dialog open={modalIsOpen}>
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
                  <Input ref={emailTokenRef} fullWidth placeholder="인증번호를 입력하세요" />
                </div>
                <div className="modal-body-button">
                  <Button
                    color="primary"
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
