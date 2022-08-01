import { Button } from "../elements/Button";
import { Input } from "../elements/Input";
import "../styles/pages/signUp.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { passwordSearchValidationSchema } from "../utils/authValidation";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignInDto, PasswordSearchFormDto } from "../dto/AuthDto";
import React, { useState } from "react";
import VerifyEmailModal from "../components/modals/VerifyEmailModal";
import MetaTag from "../utils/MetaTag";

const initialValues: PasswordSearchFormDto = {
  email: "",
  password: "",
  password2: "",
};

const FindPassword = () => {
  const navigate = useNavigate();
  // email 인증, nickname 중복확인
  const [emailIsVerified, setEmailIsVerified] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const onSetEmailIsVerified = () => setEmailIsVerified(true);

  // nickname 중복확인을 하고 nickname을 바꿀 때 사용
  const submit = async (values: SignInDto) => {
    const { email, password } = values;
    const signUpRequestBody = { email, password };
    try {
      await axios.put("https://tryaz.shop/api/user/password-search", signUpRequestBody);
      toast.success(<h3>비밀번호가 변경되었습니다.</h3>, {
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
      alert("이메일을 확인해주세요");
      setModalIsOpen(true);
      // TODO url 바뀔수도 있어서 확정후에 테스트 필요
      await axios.post("https://tryaz.shop/api/email/password-search", sendEmailRequestBody);
    } catch (e: any) {
      setModalIsOpen(false);
      alert(e.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordSearchValidationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <div className="signup-wrapper">
          <MetaTag title="비밀번호 변경하기" />
          <ToastContainer />
          <h2 className="signup-header">비밀번호 찾기</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-body">
              <div className="signup-body-item">
                <label htmlFor="email" className="signup-body-item-label">
                  이메일
                </label>
                <div className="signup-body-item-input">
                  <Input
                    id="email"
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
                    {emailIsVerified ? "인증 완료" : "인증 요청"}
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
                onSetEmailIsVerified={onSetEmailIsVerified}
                url="https://tryaz.shop/api/email/password-search"
              />
              <div className="signup-body-item">
                <label htmlFor="password" className="signup-body-item-label">
                  비밀번호
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
                  비밀번호 확인
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
                color={!emailIsVerified || errors.password || errors.password2 ? "skyblue" : "primary"}
                type="submit"
                disabled={!emailIsVerified}
                fullWidth
              >
                비밀번호 변경하기
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default FindPassword;
