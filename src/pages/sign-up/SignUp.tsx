import { Button } from "../../elements/Button";
import { Input } from "../../elements/Input";
import "../../styles/pages/sign-up/signUp.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInValidationSchema, signUpValidationSchema } from "../../utils/formVaidation";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignUpDto {
  email: string;
  username?: string;
  password?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
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

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password2: "",
      }}
      validationSchema={signInValidationSchema}
      onSubmit={submit}
    >
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
                  <Button size="medium">인증 요청</Button>
                </div>
                <div className="signup-body-item-error">
                  <ErrorMessage name="email" />
                </div>
              </div>
              {/*<div className="signup-body-items">
              <div className="signup-body-item-label">인증번호</div>
              <div className="signup-body-item-input">
                <Input size="medium" />
                <Button size="medium">인증번호 확인</Button>
              </div>
              <div className="signup-body-item-error"></div>
            </div>*/}
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
