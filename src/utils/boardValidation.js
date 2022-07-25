import * as Yup from "yup";

export const addBoardValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("🗙 제목을 입력해주세요!")
    .min(3, "🗙 제목은 3글자 이상 입력해주세요!")
    .max(20, "🗙 제목을 20글자 이하로 입력해주세요!"),
  category: Yup.string().required("🗙 카테고리를 선택해주세요!"),
  price: Yup.number()
    .typeError("🗙 숫자만 입력하세요!")
    .integer()
    .positive("🗙 양수만 입력하세요!")
    .required("🗙 가격을 입력해주세요!")
    .max(999999999, "🗙 10억은 너무 비싸요!"),
  explain: Yup.string()
    .required("🗙 상품에 대한 설명을 입력해주세요!")
    .min(10, "🗙 설명은 10글자 이상 입력해주세요!")
    .max(200, "🗙 설명은 200글자 이하로 입력해주세요!"),
  files: Yup.array()
    .of(
      Yup.object().shape({
        preview_URL: Yup.string(),
        type: Yup.string(),
      }),
    )
    .required("🗙 비디오나 사진은 최소 하나 등록해주세요!"),
});
