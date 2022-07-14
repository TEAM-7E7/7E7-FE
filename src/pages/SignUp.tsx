import { Button } from "../elements/Button";
import { Input } from "../elements/Input";
import "../styles/pages/signUp.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpValidationSchema } from "../utils/authValidation";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpDto, SignUpFormDto } from "../dto/AuthDto";
import React, { useState } from "react";
import VerifyEmailModal from "../elements/modals/VerifyEmailModal";

const initialValues: SignUpFormDto = {
  email: "",
  nickname: "",
  password: "",
  password2: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  // email 인증, nickname 중복확인
  const [emailIsVerified, setEmailIsVerified] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  // nickname 중복확인을 하고 nickname을 바꿀 때 사용
  const [currentNickname, setCurrentNickname] = useState<string>("");
  const submit = async (values: SignUpDto) => {
    const { email, nickname, password } = values;
    const signUpRequestBody = { email: email, nickname: nickname, password: password };
    try {
      await axios.post("https://tryaz.shop/api/sign-up", signUpRequestBody);
      toast.success(<h3>회원가입이 완료되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (e: any) {
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  const sendEmail = async (email: string) => {
    const sendEmailRequestBody = {
      email: email,
      emailToken: "",
    };
    try {
      await axios.post("https://tryaz.shop/api/email-validation", sendEmailRequestBody);
      setModalIsOpen(true);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  const checkDuplicateNickname = async (nickname: string) => {
    const checkDuplicateNicknameRequestBody = {
      nickname: nickname,
    };
    try {
      await axios.post("https://tryaz.shop/api/nickname-check", checkDuplicateNicknameRequestBody);
      alert("닉네임을 사용하실 수 있습니다.");
      setCurrentNickname(nickname);
    } catch (e) {
      console.log(e);
      alert("이미 존재하는 닉네임입니다.");
      setCurrentNickname(nickname);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <div className="signup-wrapper">
          <ToastContainer />
          <div className="signup-header">
            <div className="signup-header-title">회원가입</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="signup-body">
              <div className="signup-body-item">
                <div className="signup-body-item-label">이메일</div>
                <div className="signup-body-item-input">
                  <Input
                    size="medium"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    disabled={emailIsVerified}
                    placeholder="아이디@email.com"
                  />
                  <Button
                    size="medium"
                    color={emailIsVerified ? "primary" : "skyblue"}
                    onClick={() => {
                      sendEmail(values.email);
                    }}
                    disabled={errors.email ? true : emailIsVerified}
                  >
                    인증 요청
                  </Button>
                </div>
                <div className="signup-body-item-error">
                  {emailIsVerified
                    ? "✔ 이메일 인증이 완료되었습니다."
                    : errors.email
                    ? errors.email
                    : "🗙 이메일 인증을 해주세요."}
                </div>
              </div>
              <VerifyEmailModal
                userEmail={values.email}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                setEmailIsVerified={setEmailIsVerified}
              />
              <div className="signup-body-item">
                <div className="signup-body-item-label">닉네임</div>
                <div className="signup-body-item-input">
                  <Input
                    size="medium"
                    name="nickname"
                    onChange={handleChange}
                    value={values.nickname}
                    placeholder="한글과 공백 포함 2~16자리"
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
                  {errors.nickname
                    ? errors.nickname
                    : currentNickname !== "" && currentNickname === values.nickname
                    ? "✔ 사용할 수 있는 닉네임입니다."
                    : "🗙 닉네임 중복확인을 해주세요"}
                </div>
              </div>
              <div className="signup-body-item">
                <div className="signup-body-item-label">비밀번호</div>
                <div className="signup-body-item-input">
                  <Input
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
                <div className="signup-body-item-label">비밀번호 확인</div>
                <div className="signup-body-item-input">
                  <Input
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
                color={
                  !emailIsVerified || currentNickname === "" || currentNickname !== values.nickname
                    ? "skyblue"
                    : "primary"
                }
                type="submit"
                disabled={!emailIsVerified || currentNickname === "" || currentNickname !== values.nickname}
                fullWidth
              >
                등록하기
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
