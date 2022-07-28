import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Input } from "../../elements/Input";
import { useRef } from "react";
import axios from "axios";
import { Button } from "../../elements/Button";
import "../../styles/components/modals/settingmodal.scss";
import { Formik } from "formik";
import { PasswordChangeFormDto, PasswordChangeDto } from "../../dto/AuthDto";
import { passwordChangeValidationSchema } from "../../utils/authValidation";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { instanceWithToken } from "../../api/api";

interface PasswordChangeModalDto {
  open: boolean;
  handleClose: () => void;
}

const initialValues: PasswordChangeFormDto = {
  password: "",
  password2: "",
};

const PasswordChangeModal = function SelectUploadTypeModal({ open, handleClose }: PasswordChangeModalDto) {
  const navigate = useNavigate();

  const submit = async (values: PasswordChangeDto) => {
    const { password } = values;
    const signUpRequestBody = { password };
    try {
      await instanceWithToken.put("https://tryaz.shop/api/user/password-update", signUpRequestBody);
      toast.success(<h3>비밀번호가 변경되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (e: any) {
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="modal">
      <h3 className="modal-header">비밀번호 변경</h3>
      <div className="modal-body">
        <Formik
          initialValues={initialValues}
          validationSchema={passwordChangeValidationSchema}
          onSubmit={submit}
          validateOnMount={true}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <div className="signup-wrapper">
              <ToastContainer />
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-body">
                  <div className="signup-body-item">
                    <label htmlFor="password" className="signup-body-item-label">
                      새 비밀번호
                    </label>
                    <div className="signup-body-item-input">
                      <Input
                        id="password"
                        size="medium"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        fullWidth
                        type="password"
                        placeholder="공백을 제외한 특수문자, 알파벳, 숫자를 모두 포함한 8~16자리"
                      />
                    </div>
                    <div className="signup-body-item-error">
                      {errors.password ? errors.password : "✔ 사용할 수 있는 비밀번호입니다."}
                    </div>
                  </div>
                  <div className="signup-body-item">
                    <label htmlFor="password2" className="signup-body-item-label">
                      새 비밀번호 확인
                    </label>
                    <div className="signup-body-item-input">
                      <Input
                        id="password2"
                        size="medium"
                        name="password2"
                        onChange={handleChange}
                        value={values.password2}
                        fullWidth
                        type="password"
                        placeholder="한번 더 입력하세요!"
                      />
                    </div>
                    <div className="signup-body-item-error">
                      {errors.password2 ? errors.password2 : "✔ 비밀번호가 일치합니다."}
                    </div>
                  </div>
                  <Button
                    size="medium"
                    color={errors.password || errors.password2 ? "skyblue" : "primary"}
                    type="submit"
                    fullWidth
                  >
                    비밀번호 변경하기
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default PasswordChangeModal;
