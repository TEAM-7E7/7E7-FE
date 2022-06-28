import

export const signUpValidation = Yup.object().shape({
  email: Yup.string().email("올바른 이메일 형식이 아닙니다!").required("이메일을 입력하세요!"),
  password: Yup.string().required("패스워드를 입력하세요!"),
});
