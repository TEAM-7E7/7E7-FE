import "../styles/pages/editboard.scss";
import { Button } from "../elements/Button";
import { IconButton } from "../elements/IconButton";
import { useEffect, useState } from "react";
import { Formik } from "formik";
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
import { useNavigate, useParams } from "react-router-dom";
import { Video } from "../elements/Video";
import axios from "axios";
import { AddBoardAndEditBoardDto, ImageMapDto } from "../dto/AddBoardAndEditBoardDto";
import { BoardCategory } from "../dto/BoardCategoryAndState";

const EditBoard = () => {
  const { board_id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<AddBoardAndEditBoardDto | any>();
  const navigate = useNavigate();
  const submit = async (values: AddBoardAndEditBoardDto) => {
    const { title, category, price, explain, files } = values;
    const editBoardRequestBody = {
      title: title,
      description: explain,
      fileIdList: files.map((item) => item.file_id),
      category: category,
      sellPrice: Number(price),
    };
    await instanceWithToken
      .put(`/api/goods/${board_id}`, editBoardRequestBody)
      .then(() => {
        alert("게시물 수정이 완료되었습니다.");
        navigate("/my-page");
      })
      .catch((err) => alert(err.response.data.message));
  };
  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(`https://tryaz.shop/api/goods/details/${board_id}`);

      const initialFileList = data.data.imageMapList.map((file: ImageMapDto) => {
        const fileType = file.url.split(".").at(-1);
        if (
          fileType === "mp4" ||
          fileType === "m4v" ||
          fileType === "avi" ||
          fileType === "wmv" ||
          fileType === "mwa" ||
          fileType === "asf" ||
          fileType === "mpg" ||
          fileType === "mpeg" ||
          fileType === "mkw"
        ) {
          return {
            preview_URL: file.url,
            file_id: file.id,
            type: "video",
          };
        }
        return {
          preview_URL: file.url,
          file_id: file.id,
          type: "image",
        };
      });
      setInitialState({
        title: data.data.title,
        category: data.data.category,
        price: data.data.sellPrice,
        explain: data.data.description,
        files: initialFileList,
      });
    };
    getBoard();
  }, []);

  return (
    <Formik
      initialValues={initialState}
      validationSchema={addBoardValidationSchema}
      onSubmit={submit}
      validateOnMount={true}
      enableReinitialize={true}
    >
      {({ values, handleSubmit, handleChange, setValues, errors }) => (
        <>
          {values && (
            <div className="editboard-wrapper">
              <form onSubmit={handleSubmit}>
                <div className="editboard-body">
                  <div className="preview-main-image">
                    {values.files[0] &&
                      (values.files[0].type === "image" ? (
                        <img src={values.files[0].preview_URL} />
                      ) : (
                        <Video src={values.files[0].preview_URL} autoPlay={true} />
                      ))}
                  </div>
                  <div className="editboard-form">
                    <div className="drag-explain">이미지를 드래그해서 썸네일을 바꿀 수 있어요!</div>
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
                      <>
                        {values.files.length > 5 ? (
                          <div className="editboard-form-error">사진/비디오는 5개 까지 등록 가능합니다!</div>
                        ) : (
                          <div className="editboard-form-error">
                            <span className="valid">사진/비디오 등록이 완료되었습니다!</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="editboard-form-error">최소 하나 이상의 사진/비디오를 등록해주세요!</div>
                    )}
                    <div className="input-title">
                      <Input
                        color="skyblue"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        fullWidth
                        placeholder="제목을 입력하세요"
                      />
                      <div className="editboard-form-error">
                        {errors.title ? errors.title : <span className="valid">제목이 입력되었습니다!</span>}
                      </div>
                    </div>
                    <div className="category-and-price">
                      <div className="dropdown-category">
                        <Select name="category" value={values.category} onChange={handleChange}>
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
                        <div className="editboard-form-error">
                          <div>
                            {errors.category ? (
                              errors.category
                            ) : (
                              <span className="valid">카테고리가 선택되었습니다!</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="input-price">
                        <Input
                          color="skyblue"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          placeholder="가격을 입력하세요"
                        />
                        <div className="editboard-form-error">
                          <div>{errors.price ? errors.price : <span className="valid">가격이 적당한가요?</span>}</div>
                        </div>
                      </div>
                    </div>

                    <div className="textfield-explain">
                      <TextField
                        name="explain"
                        value={values.explain}
                        onChange={handleChange}
                        fullWidth
                        placeholder="설명을 써주세요!"
                        rows={10}
                      />
                      <div className="editboard-form-error">
                        {errors.explain ? errors.explain : <span className="valid">좋은 설명이네요!</span>}
                      </div>
                    </div>
                    <div className="submit-button">
                      <Button type="submit">Update</Button>
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
        </>
      )}
    </Formik>
  );
};
export default EditBoard;
