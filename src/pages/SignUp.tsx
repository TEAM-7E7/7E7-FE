import { Button } from "../elements/Button";
import { Input } from "../elements/Input";
import "../styles/pages/signUp.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInValidationSchema, signUpValidationSchema } from "../utils/authValidation";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpDto, SignUpFormDto } from "../dto/AuthDto";
import React, { useState } from "react";

const initialValues: SignUpFormDto = {
  email: "",
  username: "",
  password: "",
  password2: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [emailIsSent, setEmailIsSent] = useState<boolean>(false);
  const [emailToken, setEmailToken] = useState<string>("");
  const submit = async ({ ...values }: SignUpDto) => {
    console.log(values);
    /*const { email, username, password } = values;
    try {
      await axios.post("/api/auth/signup", {
        email,
        username,
        password,
      });
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
    }*/
  };

  const sendEmail = async (email: any) => {
    console.log(email);
    const emailDto = {
      email: email,
      emailToken: "",
    };
    try {
      const res = await axios.post("http://15.164.218.81:8080/api/email-validation", emailDto);
      alert("이메일을 확인해주세요");
      setEmailIsSent(true);
    } catch (e) {
      alert(`이메일이 이미 발송되었습니다.\n잠시후 다시 시도해주세요.`);
    }
  };

  const verifyEmail = async (email: any) => {
    console.log(email);
    const emailDto = {
      email: email,
      emailToken: emailToken,
    };
    try {
      const res = await axios.post("http://15.164.218.81:8080/api/email-validation", emailDto);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik initialValues={initialValues} validationSchema={signUpValidationSchema} onSubmit={submit}>
      {({ values, handleSubmit, handleChange }) => (
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
                  <Input size="medium" name="email" onChange={handleChange} value={values.email} />
                  <Button
                    onClick={() => {
                      sendEmail(values.email);
                    }}
                    size="medium"
                  >
                    인증 요청
                  </Button>
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="email" />
                </div>
              </div>
              {emailIsSent && (
                <div className="signup-body-item">
                  <div className="signup-body-item-label">인증번호</div>
                  <div className="signup-body-item-input">
                    <Input
                      size="medium"
                      name="emailToken"
                      onChange={(e: any) => {
                        setEmailToken(e.target.value);
                      }}
                      value={emailToken}
                    />
                    <Button
                      size="medium"
                      onClick={() => {
                        verifyEmail(values.email);
                      }}
                    >
                      인증 확인
                    </Button>
                  </div>
                </div>
              )}
              <div className="signup-body-item">
                <div className="signup-body-item-label">닉네임</div>
                <div className="signup-body-item-input">
                  <Input size="medium" name="username" onChange={handleChange} value={values.username} />
                  <Button size="medium">중복 확인</Button>
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="username" />
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
                  />
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="password" />
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
                  />
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="password2" />
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
