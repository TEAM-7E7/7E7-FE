import "../styles/pages/signIn.scss";
import { Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../elements/Input";
import { Button } from "../elements/Button";
import { SignInDto } from "../dto/AuthDto";
import { signInValidationSchema } from "../utils/authValidation";
import { useRefreshToken } from "../recoil/store";
import { Cookies } from "react-cookie";
import axios from "axios";
import React from "react";
import { KakaoIcon } from "../assets/icons/FigmaIcons";
import { IconButton } from "../elements/IconButton";

const initialValues: SignInDto = {
  email: "",
  password: "",
};

const SignIn = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { setRefreshToken } = useRefreshToken();
  const [searchParams] = useSearchParams();
  const submit = async (values: SignInDto) => {
    const { email, password } = values;
    const signInRequestBody = {
      email: email,
      password: password,
    };
    try {
      await axios.post("https://tryaz.shop/api/user/login", signInRequestBody).then((result) => {
        const refreshToken = result.headers["x-refresh-token"].split(" ")[1];
        const accessToken = result.headers["x-access-token"].split(" ")[1];
        setRefreshToken(refreshToken);
        const daysToExpire = new Date(2147483647 * 1000);
        cookies.set("X-ACCESS-TOKEN", accessToken, {
          expires: daysToExpire,
        });
      });

      const redirectUrl = searchParams.get("redirectUrl");
      toast.success(<h3>로그인 성공</h3>, {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (e) {
      toast.error(<h3>아이디와 비밀번호를 확인해주세요.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={signInValidationSchema}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <div className="signin-wrapper">
          <ToastContainer />
          <h2 className="signin-header">로그인</h2>
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="signin-body">
              <div className="signin-body-item">
                <label htmlFor="email" className="signin-body-item-label">
                  이메일
                </label>
                <div className="signin-body-item-input">
                  <Input
                    id="email"
                    size="medium"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    fullWidth
                    placeholder="이메일을 입력해주세요."
                  />
                </div>
                <div className="signin-body-item-error">{errors.email}</div>
              </div>
              <div className="signin-body-item">
                <label htmlFor="password" className="signin-body-item-label">
                  비밀번호
                </label>
                <div className="signin-body-item-input">
                  <Input
                    id="password"
                    size="medium"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                    fullWidth
                    placeholder="비밀번호를 입력해주세요."
                  />
                </div>
                <div className="signin-body-item-error">{errors.password}</div>
              </div>
              <div className="signin-button">
                {/*플랫폼 자체 로그인*/}
                <Button
                  color={errors.email && errors.password ? "skyblue" : "primary"}
                  disabled={errors.email && errors.password ? true : false}
                  type="submit"
                  fullWidth
                >
                  로그인
                </Button>
              </div>
              <div className="forget-password-or-go-signup">
                <div className="forget-password">
                  <div className="title">비밀번호를 잊어버리셨다면?</div>
                  <div className="content" onClick={() => navigate("/find-password")}>
                    비밀번호 찾기
                  </div>
                </div>
                <div className="go-signup">
                  <div className="title">아직 회원이 아니시라면?</div>
                  <div
                    className="content"
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                  >
                    가입하러 가기
                  </div>
                </div>
              </div>
              <hr className="separator" />
              <div className="social-login-button">
                <Button
                  fullWidth
                  onClick={() => {
                    window.location.replace("https://tryaz.shop/oauth2/authorization/google");
                  }}
                >
                  SignIn with Google
                </Button>
              </div>
              <div className="social-login-button">
                <IconButton
                  icon={<KakaoIcon />}
                  direction="right-left"
                  variant=""
                  color="kakao"
                  iconSize="medium"
                  fullWidth
                  onClick={() => {
                    window.location.replace("https://tryaz.shop/oauth2/authorization/kakao");
                  }}
                >
                  SignIn with Kakao
                </IconButton>
              </div>
              {/*<div className="social-login-button">
                <Button fullWidth>SignIn with Naver</Button>
              </div>*/}
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SignIn;
