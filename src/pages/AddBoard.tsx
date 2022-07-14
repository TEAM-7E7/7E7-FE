import "../styles/pages/addboard.scss";
import { Button } from "../elements/Button";
import { IconButton } from "../elements/IconButton";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { BoardDto, FileDto } from "../dto/AddBoardDto";
import { addBoardValidationSchema } from "../utils/boardValidation";
import { Input } from "../elements/Input";
import { TextField } from "../elements/TextField";
import SelectUploadTypeModal from "../elements/modals/SelectUploadTypeModal";
import { UploadIcon } from "../assets/icons/FigmaIcons";
import DndContainer from "../components/addBoardDnd/DndContainer";
import { DndProvider } from "react-dnd-multi-backend";
// for mobile
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { Select } from "../elements/Select";
import { instanceWithToken } from "../api/api";
import { useNavigate } from "react-router-dom";

const initialValues: BoardDto = {
  title: "",
  category: "",
  price: "",
  explain: "",
  files: [],
};

const AddBoard = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const submit = async (values: BoardDto) => {
    console.log(values);
    const { title, category, price, explain, files } = values;
    const addBoardRequestBody = {
      title: title,
      description: explain,
      fileUrls: files.map((item) => item.preview_URL),
      category: category,
      sellPrice: Number(price),
    };
    await instanceWithToken.post("/api/goods", addBoardRequestBody).then(() => {
      alert("게시물 등록이 완료되었습니다.");
      navigate("/");
    });
  };

  // [{fileUrl: "!@#213, type: "img"or "video"}]
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addBoardValidationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, setValues, errors }) => (
        <div className="addboard-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="addboard-body">
              <div className="preview-main-image">
                {values.files[0] &&
                  (values.files[0].type === "image" ? (
                    <img src={values.files[0].preview_URL} />
                  ) : (
                    <video src={values.files[0].preview_URL} controls={true} autoPlay={true} />
                  ))}
              </div>
              <div className="addboard-form">
                <div className="drag-explain">썸네일을 드래그해서 순서를 바꿀 수 있어요!</div>
                <div className="upload-item">
                  {/* drag and drop uploaded items*/}
                  <DndProvider options={HTML5toTouch}>
                    <DndContainer values={values} setValues={setValues} />
                  </DndProvider>
                  <div className="upload-button">
                    <IconButton
                      size="large"
                      color="primary"
                      icon={<UploadIcon />}
                      onClick={() => {
                        setModalIsOpen(true);
                      }}
                    ></IconButton>
                  </div>
                </div>
                <div className="input-title">
                  <Input name="title" onChange={handleChange} fullWidth placeholder="제목을 입력하세요" />
                  <div className="addboard-form-error">{errors.title}</div>
                </div>
                <div className="category-and-price">
                  <div className="dropdown-category">
                    <Select name="category" onChange={handleChange}>
                      <option value="" disabled selected hidden>
                        카테고리 선택
                      </option>
                      <option value="DIGITAL_ELECTRONICS">디지털/가전</option>
                      <option value="FURNITURE_INTERIOR">가구/인테리어</option>
                      <option value="INFANT_BOOK">유아동/유아도서</option>
                      <option value="LIVING_INSTANCE">생활/가공식품</option>
                      <option value="SPORT_LEISURE">스포츠/레저</option>
                      <option value="WOMAN_GOODS">여성잡화</option>
                      <option value="WOMAN_FASHION">여성의류</option>
                      <option value="MAN_FASHION_GOODS">남성패션/잡화</option>
                    </Select>
                    <div className="addboard-form-error">
                      <div>{errors.category}</div>
                    </div>
                  </div>
                  <div className="input-price">
                    <Input name="price" onChange={handleChange} placeholder="가격을 입력하세요" />
                    <div className="addboard-form-error">
                      <div>{errors.price}</div>
                    </div>
                  </div>
                </div>

                <div className="textfield-explain">
                  <TextField
                    name="explain"
                    onChange={handleChange}
                    fullWidth
                    placeholder="설명을 써주세요!"
                    rows={10}
                  />
                  <div className="addboard-form-error">{errors.explain}</div>
                </div>
                <div className="submit-button">
                  <Button type="submit">Upload</Button>
                </div>
              </div>
            </div>
            <SelectUploadTypeModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              setValues={setValues}
              values={values}
            />
          </form>
        </div>
      )}
    </Formik>
  );
};
export default AddBoard;
