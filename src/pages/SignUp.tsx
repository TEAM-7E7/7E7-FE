import { Button } from "../elements/Button";
import { Input } from "../elements/Input";
import "../styles/pages/signUp.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpValidationSchema } from "../utils/authValidation";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpDto, SignUpFormDto } from "../dto/AuthDto";
import React, { useState } from "react";

const initialValues: SignUpFormDto = {
  email: "",
  nickname: "",
  emailToken: "",
  password: "",
  password2: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false);
  const [emailIsVerified, setEmailIsVerified] = useState<boolean>(false);
  const [nicknameIsExist, setNicknameIsExist] = useState<boolean>(false);
  const submit = async (values: SignUpDto) => {
    console.log(values);
    const { email, nickname, password } = values;
    const signUpRequestBody = { email: email, nickname: nickname, password: password };
    try {
      await axios.post("http://15.164.218.81:8080/api/sign-up", signUpRequestBody);
      toast.success(<h3>회원가입이 완료되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
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
      alert("잠시만 기다려주세요.");
      await axios.post("http://15.164.218.81:8080/api/email-validation", sendEmailRequestBody);
      alert("이메일을 확인해주세요.");
      setEmailIsSent(true);
    } catch (e) {
      alert(`이메일이 이미 발송되었습니다.\n잠시후 다시 시도해주세요.`);
    }
  };
  const verifyEmail = async (email: string, emailToken: string) => {
    const verifyEmailRequestBody = {
      email: email,
      emailToken: emailToken,
    };
    try {
      await axios.post("http://15.164.218.81:8080/api/email-validation", verifyEmailRequestBody);
      alert("이메일 인증이 완료되었습니다.");
      setEmailIsVerified(true);
    } catch (e) {
      alert(`인증번호가 일치하지 않습니다.`);
    }
  };

  const checkDuplicateNickname = async (nickname: string) => {
    const checkDuplicateNicknameRequestBody = {
      nickname: nickname,
    };
    try {
      await axios.post("http://15.164.218.81:8080/api/nickname-check", checkDuplicateNicknameRequestBody);
      alert("닉네임을 사용하실 수 있습니다.");
      setNicknameIsExist(true);
    } catch (e) {
      alert("이미 존재하는 닉네임입니다.");
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
                    disabled={emailIsSent}
                  />
                  <Button
                    size="medium"
                    onClick={() => {
                      sendEmail(values.email);
                    }}
                    disabled={!!(emailIsSent || errors.email)}
                    variant={emailIsSent ? "outlined" : "filled"}
                    color={emailIsSent ? "primary" : "default"}
                  >
                    {emailIsSent ? "발송 완료" : "인증 요청"}
                  </Button>
                </div>
                <div className="signup-body-item-error">{errors.email}</div>
              </div>
              {emailIsSent && (
                <div className="signup-body-item">
                  <div className="signup-body-item-label">인증번호</div>
                  <div className="signup-body-item-input">
                    <Input
                      size="medium"
                      name="emailToken"
                      value={values.emailToken}
                      onChange={handleChange}
                      disabled={emailIsVerified}
                    />
                    <Button
                      onClick={() => {
                        verifyEmail(values.email, values.emailToken);
                      }}
                      size="medium"
                      variant={emailIsVerified ? "outlined" : "filled"}
                      color={emailIsVerified ? "primary" : "default"}
                      disabled={emailIsVerified}
                    >
                      {emailIsVerified ? "인증 완료" : "인증 확인"}
                    </Button>
                  </div>
                  <div className="signup-body-item-error">{errors.emailToken}</div>
                </div>
              )}
              <div className="signup-body-item">
                <div className="signup-body-item-label">닉네임</div>
                <div className="signup-body-item-input">
                  <Input
                    size="medium"
                    name="nickname"
                    onChange={handleChange}
                    value={values.nickname}
                    disabled={nicknameIsExist}
                  />
                  <Button
                    onClick={() => {
                      checkDuplicateNickname(values.nickname);
                    }}
                    size="medium"
                    variant={nicknameIsExist ? "outlined" : "filled"}
                    color={nicknameIsExist ? "primary" : "default"}
                    disabled={nicknameIsExist}
                  >
                    {nicknameIsExist ? "확인 완료" : "중복 확인"}
                  </Button>
                </div>
                <div className="signup-body-item-error">{errors.nickname}</div>
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
                  />
                </div>
                <div className="signup-body-item-error">{errors.password}</div>
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
                  />
                </div>
                <div className="signup-body-item-error">{errors.password2}</div>
              </div>
              <Button size="medium" color="submit" type="submit" fullWidth>
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
