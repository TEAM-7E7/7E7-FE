import "../styles/pages/signIn.scss";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../elements/Input";
import { Button } from "../elements/Button";
import { SignInDto, SingInFormDto } from "../dto/AuthDto";
import { signInValidationSchema } from "../utils/authValidation";

const initialValues: SingInFormDto = {
  email: "",
  password: "",
};
const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const submit = async (values: SignInDto) => {
    const { email, password } = values;
    const signInRequestBody = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("http://15.164.218.81:8080/api/login", signInRequestBody);
      console.log(res);
      const redirectUrl = searchParams.get("redirectUrl");
      toast.success(<h3>로그인 성공</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      // redirectUrl이 쿼리스트링으로 존재하면
      // 원래가고자 했던 페이지로 돌아가기
      setTimeout(() => {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (e) {
      console.log(e);
      // 서버에서 받은 에러 메시지 출력
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
                <Button fullWidth>SignIn with Kakao</Button>
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
