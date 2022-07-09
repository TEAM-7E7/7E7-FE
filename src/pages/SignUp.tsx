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
  // email 인증, nickname 중복확인
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false);
  const [emailIsVerified, setEmailIsVerified] = useState<boolean>(false);
  const [nicknameIsNotDuplicate, setNicknameIsNotDuplicate] = useState<boolean>(false);
  // nickname 중복확인을 하고 nickname을 바꿀 때 사용
  const [currentNickname, setCurrentNickname] = useState<string>("");
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
      setNicknameIsNotDuplicate(true);
      setCurrentNickname("nickName");
    } catch (e) {
      alert("이미 존재하는 닉네임입니다.");
      setNicknameIsNotDuplicate(false);
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
                    onClick={() => {
                      sendEmail(values.email);
                    }}
                    disabled={errors.email ? !emailIsVerified : false}
                    variant={emailIsVerified ? "outlined" : "filled"}
                    color={emailIsVerified ? "primary" : "default"}
                  >
                    인증요청
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
                    placeholder="한글 포함 최대 16글자"
                  />
                  <Button
                    onClick={() => {
                      checkDuplicateNickname(values.nickname);
                    }}
                    size="medium"
                    /*variant={nicknameIsNotDuplicate ? "outlined" : "filled"}*/
                    /*color={nicknameIsNotDuplicate ? "primary" : "default"}*/
                    disabled={!!errors.nickname}
                  >
                    중복 확인
                  </Button>
                </div>
                <div className="signup-body-item-error">
                  {/* {nicknameIsNotDuplicate
                    ? "✔ 사용할 수 있는 닉네임입니다."
                    : errors.nickname
                    ? errors.nickname
                    : "🗙 닉네임 중복확인을 해주세요"}*/}
                  {currentNickname !== "" && currentNickname === values.nickname
                    ? "✔ 사용할 수 있는 닉네임입니다."
                    : errors.nickname
                    ? errors.nickname
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
