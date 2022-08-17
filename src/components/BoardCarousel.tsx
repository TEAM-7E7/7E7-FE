import { ImageMapDto } from "../dto/BoardDto";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Video } from "../elements/Video";
import React, { useEffect, useRef, useState } from "react";
import "../styles/components/boardcarousel.scss";

interface BoardCarouselDto {
  imageMapList: ImageMapDto[];
}

const settings = {
  className: "slider-items",
  infinite: false,
  speed: 500,
  slideToShow: 1,
  dots: true,
  arrows: false,
};

const BoardCarousel = ({ imageMapList }: BoardCarouselDto) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderItemRef = useRef<HTMLDivElement[]>([]);
  // slider에서 보이는 동영상만 재생하기
  useEffect(() => {
    sliderItemRef.current.forEach((element: HTMLDivElement | any, index: number) => {
      const sliderItem = element?.childNodes[1];
      if (sliderItem?.childNodes[0] && sliderItem?.childNodes[0].tagName === "VIDEO") {
        if (currentIndex === index) {
          setTimeout(() => {
            sliderItem.childNodes[0].play();
          }, 150);
        } else {
          sliderItem.childNodes[0].pause();
        }
      }
    });
  }, [currentIndex]);

  return (
    <div className="boardcarousel-wrapper">
      <Slider
        {...settings}
        afterChange={(index) => {
          setCurrentIndex(index);
        }}
      >
        {imageMapList.map((item, index) => {
          const fileType = item.url.split(".").at(-1);
          return (
            <div
              className="slider-item"
              key={index}
              ref={(element: HTMLDivElement) => (sliderItemRef.current[index] = element)}
            >
              <div className="slider-item-gradient" />
              {fileType === "mp4" ||
              fileType === "m4v" ||
              fileType === "avi" ||
              fileType === "wmv" ||
              fileType === "mwa" ||
              fileType === "asf" ||
              fileType === "mpg" ||
              fileType === "mpeg" ||
              fileType === "mkw" ? (
                <Video src={item.url} autoPlay={false} />
              ) : (
                <img src={item.url} />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BoardCarousel;
