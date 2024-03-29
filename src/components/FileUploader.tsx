import React, { memo } from "react";
import "../styles/components/fileuploader.scss";
import { ImageIcon } from "../assets/icons/FigmaIcons";
import { IconButton } from "../elements/IconButton";
import { FileUploaderDto } from "../dto/AddBoardAndEditBoardDto";
import { instanceWithToken } from "../api/api";

const FileUploader = memo(({ values, setValues, setModalIsOpen }: FileUploaderDto) => {
  let inputRef: HTMLInputElement;

  const saveImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files: FileList | null = e.target.files;
    const fileList: any = [];
    const formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const fileType = files[i].type.split("/")[0];
        if (fileType === "video") {
          await new Promise((resolve) => {
            const preview_URL = URL.createObjectURL(files[i]);
            const videoElement = document.createElement("video");
            videoElement.src = preview_URL;
            const timer = setInterval(() => {
              if (videoElement.readyState == 4) {
                if (videoElement.duration > 16) {
                  alert("동영상의 길이가 16초보다 길면 안됩니다");
                  // src에 넣지 않을 것이므로 미리보기 URL 제거
                } else {
                  fileList.push({ type: fileType });
                  formData.append("goodsImage", files[i]);
                }
                URL.revokeObjectURL(preview_URL);
                clearInterval(timer);
                resolve("good");
              }
            }, 500);
          });
        } else {
          fileList.push({ type: fileType });
          formData.append("goodsImage", files[i]);
        }
      }
    }
    if (fileList) {
      const res = await instanceWithToken.post("/api/goods/image-upload", formData);
      for (let i = 0; i < res.data.data.length; i++) {
        fileList[i]["preview_URL"] = res.data.data[i].url;
        fileList[i]["file_id"] = res.data.data[i].id;
      }
      setValues({ ...values, files: [...values.files, ...fileList] });
      setModalIsOpen(false);
    }
  };
  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="video/mp4, video/m4v, video/avi, video/wmv, video/mwa, video/asf, video/mpg, video/mpeg, video/mkv, image/jpg, image/png, image/jpeg, image/gif, image/svg"
        onChange={saveImage}
        multiple
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          (e.target as HTMLInputElement).value = "";
        }}
        ref={(refParam: HTMLInputElement) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      <IconButton onClick={() => inputRef.click()} icon={<ImageIcon />} direction="top-bottom" iconSize="large">
        앨범에서
        <br />
        선택할게요
      </IconButton>
    </div>
  );
});

export default FileUploader;
