import React, { useState, useRef, useCallback, useEffect } from "react";
import "../styles/elements/video.scss";
import { MuteIcon, NotMuteIcon, PauseIcon, PlayIcon } from "../assets/icons/FigmaIcons";
import { useInView } from "react-intersection-observer";

interface VideoOptions {
  src: string;
  autoPlay?: boolean;
}

export function Video({ src, autoPlay = false }: VideoOptions) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsViewRef, isView] = useInView();

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const handleMute = () => {
    videoRef.current!.muted = true;
    setIsMuted(true);
  };

  const handleSoundOn = () => {
    videoRef.current!.muted = false;
    setIsMuted(false);
  };

  useEffect(() => {
    if (isView) {
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [isView]);

  return (
    <div className="video-body" ref={videoIsViewRef}>
      <video src={src} ref={videoRef} autoPlay={autoPlay} muted={true} />
      <div className="video-volume-icon">
        {isMuted ? (
          <div onClick={handleSoundOn}>
            <MuteIcon />
          </div>
        ) : (
          <div onClick={handleMute}>
            <NotMuteIcon />
          </div>
        )}
      </div>
      <div className="video-play-icon">
        {isPlaying ? (
          <div onClick={handlePause}>
            <PauseIcon />
          </div>
        ) : (
          <div onClick={handlePlay}>
            <PlayIcon />
          </div>
        )}
      </div>
    </div>
  );
}
