import React, { useState } from "react";
import "../../styles/components/fileUploader/fileuploader.scss";
import { Button } from "../../elements/Button";
import { FileDto } from "../../dto/BoardDto";
import { ImageIcon } from "../../assets/icons/FigmaIcons";
import { IconButton } from "../../elements/IconButton";

const FileUploader = ({ setState }: any) => {
  const [file, setFile] = useState<Array<FileDto>>([]);
  console.log(file);
  let inputRef: HTMLInputElement;
  const saveImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 미리보기 url 만들기
    const files: FileList | null = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);
        fileReader.onload = () => {
          const fileType = files[i].type.split("/")[0];
          // video일 때 시간 제한 16초
          if (fileType === "video") {
            const videoElement = document.createElement("video");
            videoElement.src = fileReader.result as string;
            /*
              video 길이 제한!
              videoElement의 readyState가 4면 비디오가 로딩이 된 것이므로 길이를 판별할 수 있다
              video가 재생할 수 있는 상태로 만드는 과정이 비동기적으로 실행되기 때문에
              setInterval로 비디오가 로딩된 상태가 될 때까지 계속 확인하면서 기다려준다
            */
            const timer = setInterval(() => {
              if (videoElement.readyState == 4) {
                if (videoElement.duration > 16) {
                  alert("동영상의 길이가 16초보다 길면 안됩니다");
                } else {
                  setFile([
                    ...file,
                    {
                      fileObject: files[i],
                      preview_URL: fileReader.result,
                      type: fileType,
                    },
                  ]);
                }
                clearInterval(timer);
              }
            }, 500);
          } else {
            // image일 땐 시간제한이 없으므로 그냥 상태에 넣어줌
            setFile([
              ...file,
              {
                fileObject: files[i],
                preview_URL: fileReader.result,
                type: fileType,
              },
            ]);
          }
        };
      }
    }
  };

  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="video/*, image/*"
        onChange={saveImage}
        multiple
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
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
};

export default FileUploader;
