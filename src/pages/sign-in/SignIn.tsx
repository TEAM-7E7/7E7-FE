import "../../styles/pages/sign-in/signIn.scss";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";

interface SignInDto {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = async (values: SignInDto) => {
    console.log(values);
    /*try {
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
      });
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
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }*/
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={submit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <div className="signin-wrapper">
          <div className="signin-header"></div>
          <form onSubmit={handleSubmit}>
            <div className="signin-body">
              <div className="signin-body-item">
                <div className="signin-body-item-label">email</div>
                <div className="signin-body-item-input">
                  <Input size="medium" name="email" onChange={handleChange} value={values.email} />
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="signin-body-item">
                <div className="signin-body-item-label">password</div>
                <div className="signin-body-item-input">
                  <Input size="medium" name="password" onChange={handleChange} value={values.email} />
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="signin-button">
                <Button color="submit" fullWidth>
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
