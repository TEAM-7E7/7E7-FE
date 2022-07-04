import "../../styles/pages/add-board/addboard.scss";
import { Button } from "../../elements/Button";
import { IconButton } from "../../elements/IconButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { BoardDto, FileDto } from "../../dto/AddBoardDto";
import { addBoardValidationSchema } from "../../utils/boardValidation";
import { Input } from "../../elements/Input";
import { TextField } from "../../elements/TextField";
import SelectUploadTypeModal from "../../elements/modals/SelectUploadTypeModal";
import { UploadIcon } from "../../assets/icons/FigmaIcons";
import DndContainer from "../../components/addBoardDnd/DndContainer";
import { DndProvider } from "react-dnd-multi-backend";
// for mobile
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

const initialValues: BoardDto = {
  title: "",
  category: "",
  price: "",
  explain: "",
  files: [],
};

const AddBoard = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const submit = async () => {
    console.log("ok");
  };

  return (
    <Formik initialValues={initialValues} validationSchema={addBoardValidationSchema} onSubmit={submit}>
      {({ values, handleSubmit, handleChange, setValues }) => (
        <div className="addboard-wrapper">
          <div className="addboard-header">게시물 업로드</div>
          <div className="addboard-body">
            <div className="preview-main-image">
              {values.files[0] &&
                (values.files[0].type === "image" ? (
                  <img src={values.files[0].preview_URL} />
                ) : (
                  <video src={values.files[0].preview_URL} autoPlay={true} />
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
                    icon={<UploadIcon />}
                    onClick={() => {
                      setModalIsOpen(true);
                    }}
                  ></IconButton>
                </div>
              </div>
              <div className="input-title">
                <Input fullWidth placeholder="제목을 입력하세요" />
              </div>
              <div className="category-and-price">
                <div className="dropdown-category">
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="category">category</InputLabel>
                    <Select labelId="category" label="category" value={values.category}>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="input-price">
                  <Input placeholder="가격을 입력하세요" />
                </div>
              </div>
              <div className="textfield-explain">
                <TextField fullWidth placeholder="설명을 써주세요!" />
              </div>
              <div className="addboard-footer">
                <Button>Upload</Button>
              </div>
            </div>
          </div>
          <SelectUploadTypeModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            setValues={setValues}
            values={values}
          />
        </div>
      )}
    </Formik>
  );
};
export default AddBoard;
