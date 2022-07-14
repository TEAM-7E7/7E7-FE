import "../styles/pages/signIn.scss";
import { Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../elements/Input";
import { Button } from "../elements/Button";
import { SignInDto, SingInFormDto } from "../dto/AuthDto";
import { signInValidationSchema } from "../utils/authValidation";
import { useRecoilState } from "recoil";
import { refresh_token } from "../recoil/store";
import { Cookies } from "react-cookie";
import axios from "axios";
import React from "react";

const initialValues: SingInFormDto = {
  email: "",
  password: "",
};

const cookies = new Cookies();

const SignIn = () => {
  const navigate = useNavigate();
  const [refreshToken, setRefreshToken] = useRecoilState(refresh_token);
  const [searchParams] = useSearchParams();
  const submit = async (values: SignInDto) => {
    const { email, password } = values;
    const signInRequestBody = {
      email: email,
      password: password,
    };
    try {
      await axios.post("https://tryaz.shop/api/login", signInRequestBody).then((result) => {
        setRefreshToken(result.headers["x-refresh-token"].split(" ")[1]);
        cookies.set("X-ACCESS-TOKEN", result.headers["x-access-token"].split(" ")[1]);
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
          <div className="signin-header">로그인</div>
          <form onSubmit={handleSubmit}>
            <div className="signin-body">
              <div className="signin-body-item">
                <div className="signin-body-item-label">email</div>
                <div className="signin-body-item-input">
                  <Input size="medium" name="email" onChange={handleChange} value={values.email} />
                </div>
                <div className="signin-body-item-error">{errors.email}</div>
              </div>
              <div className="signin-body-item">
                <div className="signin-body-item-label">password</div>
                <div className="signin-body-item-input">
                  <Input
                    size="medium"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    type="password"
                  />
                </div>
                <div className="signin-body-item-error">{errors.password}</div>
              </div>
              <div className="signin-button">
                {/*플랫폼 자체 로그인*/}
                <Button color="submit" type="submit" fullWidth>
                  Login
                </Button>
              </div>
              <div className="forget-password-or-go-signup">
                <div className="forget-password">
                  <div className="title">비밀번호를 잊어버리셨다면?</div>
                  <div className="content">비밀번호 찾기</div>
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
                <Button fullWidth>SignIn with Google</Button>
              </div>
              <div className="social-login-button">
                <Button
                  fullWidth
                  onClick={() => {
                    const kakao = async () => {
                      await axios.get("https://tryaz.shop/oauth2/authorization/kakao");
                    };
                  }}
                >
                  SignIn with Kakao
                </Button>
              </div>
              <div className="social-login-button">
                <Button fullWidth>SignIn with Naver</Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default SignIn;
