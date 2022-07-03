import * as Yup from "yup";

export const addBoardValidationSchema = Yup.object().shape({
  title: Yup.string().required("제목을 입력해주세요!"),
  category: Yup.string().required("카테고리를 선택해주세요!"),
  price: Yup.string().required("가격을 입력해주세요!"),
  explain: Yup.string().required("상품에 대한 설명을 해주세요!"),
  files: Yup.array()
    .of(
      Yup.object().shape({
        fileObject: Yup.mixed(),
        preview_URL: Yup.string(),
        type: Yup.string(),
      }),
    )
    .min(1, "최소 사진 하나는 등록해주세요!"),
});
