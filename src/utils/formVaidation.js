import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email("올바른 이메일 형식이 아닙니다!").required("이메일을 입력하세요!"),
  username: Yup.string()
    .min(2, "닉네임은 최소 2글자 이상입니다!")
    .max(10, "닉네임은 최대 10글자입니다!")
    .matches(
      /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!",
    )
    .required("닉네임을 입력하세요!"),
  password: Yup.string()
    .min(8, "비밀번호는 최소 8자리 이상입니다")
    .max(16, "비밀번호는 최대 16자리입니다!")
    .required("패스워드를 입력하세요!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])\S*$/,
      "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!",
    ),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
    .required("필수 입력 값입니다!"),
});
