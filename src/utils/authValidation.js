import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email("🗙 올바른 이메일 형식이 아닙니다!").required(" "),
  nickname: Yup.string()
    .min(2, "🗙 닉네임은 최소 2글자 이상입니다!")
    .max(16, "🗙 닉네임은 최대 16글자입니다!")
    .matches(/^[\S].*[\S]$/, "🗙 닉네임의 시작과 끝이 공백이면 안됩니다.")
    .matches(/^[가-힣][가-힣\s]*[가-힣]$/, "🗙 닉네임은 한글과 공백으로만 구성되야합니다.")
    .required(" "),
  password: Yup.string()
    .min(8, "🗙 비밀번호는 최소 8자리 이상입니다")
    .max(16, "🗙 비밀번호는 최대 16자리입니다!")
    .required(" ")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])\S*$/,
      "🗙 공백을 제외한 특수문자와 알파벳, 숫자를 모두 포함한 8~16자리",
    ),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "🗙 비밀번호가 일치하지 않습니다!")
    .required(" "),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("올바른 이메일 형식이 아닙니다!").required(" "),
  password: Yup.string().required(" "),
});
