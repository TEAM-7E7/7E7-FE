import { Dialog } from "@mui/material";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";
import "../../styles/components/modals/settingmodal.scss";
import { Formik } from "formik";
import { NicknameChangeDto } from "../../dto/AuthDto";
import { nicknameChangeValidationSchema } from "../../utils/authValidation";
import { toast, ToastContainer } from "react-toastify";
import { instanceWithToken } from "../../api/api";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { NicknameChangeModalDto } from "../../dto/ModalDto";

const initialValues: NicknameChangeDto = {
  nickname: "",
};

const NicknameChangeModal = function NicknameChangeModal({ open, handleClose, reloadToken }: NicknameChangeModalDto) {
  const [currentNickname, setCurrentNickname] = useState<string>("");

  const submit = async (values: NicknameChangeDto) => {
    const { nickname } = values;
    try {
      await instanceWithToken.put("https://tryaz.shop/api/user/nickname-update" + `?nickname=${nickname}`);
      reloadToken();
      toast.success(<h3>닉네임이 변경되었습니다.</h3>, {
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

  const checkDuplicateNickname = async (nickname: string) => {
    const checkDuplicateNicknameRequestBody = {
      nickname: nickname,
    };
    try {
      await axios.post("https://tryaz.shop/api/user/nickname-check", checkDuplicateNicknameRequestBody).then(() => {
        alert("닉네임을 사용하실 수 있습니다.");
        setCurrentNickname(nickname);
      });
    } catch (e) {
      alert("이미 존재하는 닉네임입니다.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="modal">
      <h3 className="modal-header">닉네임 변경</h3>
      <div className="modal-body">
        <Formik
          initialValues={initialValues}
          validationSchema={nicknameChangeValidationSchema}
          onSubmit={submit}
          validateOnMount={true}
        >
          {({ values, handleSubmit, handleChange, errors }) => (
            <div className="signup-wrapper">
              <ToastContainer />
              <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-body">
                  <div className="signup-body-item">
                    <div className="signup-body-item-input">
                      <Input
                        id="nickname"
                        size="medium"
                        name="nickname"
                        onChange={handleChange}
                        value={values.nickname}
                        type="text"
                        placeholder="특수문자 제외 2~10자리"
                      />
                      <Button
                        onClick={() => {
                          checkDuplicateNickname(values.nickname);
                        }}
                        size="medium"
                        color={errors.nickname ? "skyblue" : "primary"}
                        disabled={!!errors.nickname}
                      >
                        중복 확인
                      </Button>
                    </div>
                    <div className="signup-body-item-error">
                      {errors.nickname ? (
                        errors.nickname
                      ) : currentNickname !== "" && currentNickname === values.nickname ? (
                        <span className="valid">사용할 수 있는 닉네임입니다.</span>
                      ) : (
                        "닉네임 중복확인을 해주세요"
                      )}
                    </div>
                  </div>
                  <Button
                    size="medium"
                    color={
                      currentNickname === "" ||
                      currentNickname !== values.nickname ||
                      errors.nickname ||
                      errors.nickname
                        ? "skyblue"
                        : "primary"
                    }
                    type="submit"
                    disabled={currentNickname === "" || currentNickname !== values.nickname}
                    fullWidth
                  >
                    닉네임 변경하기
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

export default NicknameChangeModal;
