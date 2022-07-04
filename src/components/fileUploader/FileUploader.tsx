import React, { memo, useState } from "react";
import "../../styles/components/fileUploader/fileuploader.scss";
import { ImageIcon } from "../../assets/icons/FigmaIcons";
import { IconButton } from "../../elements/IconButton";
import { BoardDto } from "../../dto/AddBoardDto";

interface FileUploaderDto {
  values: BoardDto;
  setValues: any;
}

const FileUploader = memo(({ values, setValues }: FileUploaderDto) => {
  let inputRef: HTMLInputElement;
  console.log(values.files);
  const saveImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList = [];
    const files: FileList | null = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const preview_URL = URL.createObjectURL(files[i]);
        const fileType = files[i].type.split("/")[0];
        if (fileType === "video") {
          await new Promise((resolve) => {
            const videoElement = document.createElement("video");
            videoElement.src = preview_URL;
            const timer = setInterval(() => {
              if (videoElement.readyState == 4) {
                if (videoElement.duration > 16) {
                  alert("동영상의 길이가 16초보다 길면 안됩니다");
                  // src에 넣지 않을 것이므로 미리보기 URL 제거
                  URL.revokeObjectURL(preview_URL);
                } else {
                  fileList.push({
                    fileObject: files[i],
                    preview_URL: preview_URL,
                    type: fileType,
                  });
                }
                clearInterval(timer);
                // 비동기 맞추기 ㅈㄴ어렵네 ㅅㅂ
                resolve("good");
              }
            }, 500);
          });
        } else {
          fileList.push({
            fileObject: files[i],
            preview_URL: preview_URL,
            type: fileType,
          });
        }
      }
    }
    setValues({ ...values, files: [...values.files, ...fileList] });
  };
  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="video/*, image/*"
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
