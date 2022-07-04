import React, { FC, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
import { useNavigate } from "react-router-dom";
import { Player } from "video-react";
import "../../styles/components/webCam/WebCam.scss";
import { Button } from "../../elements/Button";

const CONSTRAINTS = { video: true };

function padTime(time: number) {
  return time.toString().padStart(2, "0");
}

const WebCam: FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  //take picture
  const photoRef = useRef<any>(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  //recordrtc
  const [stream, setStream] = useState<MediaStream | null>();
  const [recorder, setRecorder] = useState<RecordRTC.RecordRTCPromisesHandler | null>();
  const [videoBlob, setVideoUrlBlob] = useState<Blob | null>();
  //30초 타이머
  const [timeLeft, setTimeLeft] = React.useState<number>(30);
  const minutes: any = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const intervalRef: any = React.useRef(null);
  //화면에 틀자마자 webcam 호출
  useEffect(() => {
    getVideo();
  }, [videoRef]);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 600, height: 600 },
      })
      .then((stream) => {
        const video: any = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //사진 촬영
  const takePhoto = () => {
    const width = 600;
    const height = width / (16 / 9);

    const video = videoRef.current;
    const photo: any = photoRef.current;
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };
  //비디오 녹화 시작버튼
  const startRecoding = async () => {
    const mediaDevices = navigator.mediaDevices;
    const stream: MediaStream = await mediaDevices.getUserMedia({ video: true, audio: true });
    const recorder: RecordRTCPromisesHandler = new RecordRTCPromisesHandler(stream, {
      type: "video",
    });
    await recorder.startRecording();
    setRecorder(recorder);
    setStream(stream);
    setVideoUrlBlob(null);
    // 시작버튼 누르면 30초 타이머
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft: number) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };
  //비디오 녹화 종료
  const stopRecording: any = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob: Blob = await recorder.getBlob();
      (stream as any).stop();
      setVideoUrlBlob(blob);
      setStream(null);
      setRecorder(null);
      //정지버튼 누르면 타이머 초기화 및 다시 30초 세팅
      clearInterval(intervalRef.current);
      setTimeLeft(30);
    }
  };
  //녹화 시작 후 30초뒤에 자동 종료
  useEffect(() => {
    const timeOut = setTimeout(stopRecording, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  });
  //clearTimeout(timeOut);
  const UpLoadVideo = () => {
    if (videoBlob) {
      const mp4File = new File([videoBlob], "demo.mp4", { type: "video/mp4" });
    }
  };
  return (
    <div className="webcam">
      <div className="webcam-start">
        <video autoPlay ref={videoRef} />
        <div className="webcam-button">
          <Button size="medium" onClick={startRecoding}>
            start
          </Button>
          <Button size="medium" onClick={stopRecording}>
            stop
          </Button>
          <Button size="medium" onClick={UpLoadVideo}>
            upload
          </Button>
          <Button size="medium" onClick={takePhoto}>
            촬영
          </Button>
          <div className="timer">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </div>
        </div>
      </div>
      <div className="webcam-record">
        <div className="webcam-video">
          <h1>Video</h1>
          {!!videoBlob && <Player src={URL.createObjectURL(videoBlob)} />}
        </div>
        <div className={"result " + (hasPhoto ? "hasphoto" : "")}>
          <h1>Photo</h1>
          <canvas ref={photoRef}></canvas>
          {/*<Button onClick={closePhoto}>close</Button>*/}
        </div>
      </div>
    </div>
  );
};

export default WebCam;
