import "../styles/pages/addboard.scss";
import { Button } from "../elements/Button";
import { IconButton } from "../elements/IconButton";
import { useState } from "react";
import { Formik } from "formik";
import { AddBoardDto } from "../dto/AddBoardDto";
import { BoardCategory } from "../dto/BoardCategoryAndState";
import { addBoardValidationSchema } from "../utils/boardValidation";
import { Input } from "../elements/Input";
import { TextField } from "../elements/TextField";
import SelectUploadTypeModal from "../components/modals/SelectUploadTypeModal";
import { UploadIcon } from "../assets/icons/FigmaIcons";
import DndContainer from "../components/addBoardDnd/DndContainer";
import { DndProvider } from "react-dnd-multi-backend";
// for mobile
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import { Select } from "../elements/Select";
import { instanceWithToken } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Video } from "../elements/Video";
import Board from "./Board";

const initialValues: AddBoardDto = {
  title: "",
  category: "",
  price: "",
  explain: "",
  files: [],
};

const AddBoard = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const submit = async (values: AddBoardDto) => {
    const { title, category, price, explain, files } = values;
    const addBoardRequestBody = {
      title: title,
      description: explain,
      fileIdList: files.map((item) => item.file_id),
      category: category,
      sellPrice: Number(price),
    };
    await instanceWithToken.post("/api/goods", addBoardRequestBody).then(() => {
      alert("게시물 등록이 완료되었습니다.");
      navigate("/");
    });
  };

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
                    <Video src={values.files[0].preview_URL} autoPlay={true} />
                  ))}
              </div>
              {Object.keys(errors).map((item) => {
                console.log(values.files);
                return null;
              })}
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
                {values.files.length > 0 ? (
                  <div className="addboard-form-error">✔ 사진/비디오 등록이 완료되었습니다!</div>
                ) : (
                  <div className="addboard-form-error">🗙 최소 하나 이상의 사진/비디오를 등록해주세요!</div>
                )}
                <div className="input-title">
                  <Input
                    name="title"
                    color="skyblue"
                    onChange={handleChange}
                    fullWidth
                    placeholder="제목을 입력하세요"
                  />
                  <div className="addboard-form-error">{errors.title ? errors.title : "✔ 제목이 입력되었습니다!"}</div>
                </div>
                <div className="category-and-price">
                  <div className="dropdown-category">
                    <Select name="category" onChange={handleChange}>
                      <option value="" disabled selected hidden>
                        카테고리 선택
                      </option>
                      <option value="DIGITAL_ELECTRONICS">{BoardCategory.DIGITAL_ELECTRONICS}</option>
                      <option value="FURNITURE_INTERIOR">{BoardCategory.FURNITURE_INTERIOR}</option>
                      <option value="INFANT_BOOK">{BoardCategory.INFANT_BOOK}</option>
                      <option value="LIVING_INSTANCE">{BoardCategory.LIVING_INSTANCE}</option>
                      <option value="SPORT_LEISURE">{BoardCategory.SPORT_LEISURE}</option>
                      <option value="WOMAN_GOODS">{BoardCategory.WOMAN_GOODS}</option>
                      <option value="WOMAN_FASHION">{BoardCategory.WOMAN_FASHION}</option>
                      <option value="MAN_FASHION_GOODS">{BoardCategory.MAN_FASHION_GOODS}</option>
                    </Select>
                    <div className="addboard-form-error">
                      <div>{errors.category ? errors.category : "✔ 카테고리가 선택되었습니다!"}</div>
                    </div>
                  </div>
                  <div className="input-price">
                    <Input name="price" color="skyblue" onChange={handleChange} placeholder="가격을 입력하세요" />
                    <div className="addboard-form-error">
                      <div>{errors.price ? errors.price : "✔ 가격이 적당한가요?"}</div>
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
                  <div className="addboard-form-error">{errors.explain ? errors.explain : "✔ 좋은 설명이네요!"}</div>
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
