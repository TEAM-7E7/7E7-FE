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
    sliderItemRef.current.forEach((element: any, index: any) => {
      const sliderItem = element.childNodes[1].childNodes[0];
      if (sliderItem && sliderItem.tagName === "VIDEO") {
        if (currentIndex === index) {
          sliderItem.play();
        } else {
          sliderItem.pause();
        }
      }
    });
  }, [currentIndex]);
  console.log(imageMapList);

  return (
    <div className="boardcarousel-wrapper">
      <Slider
        {...settings}
        afterChange={(index: any) => {
          setCurrentIndex(index);
        }}
      >
        {imageMapList.map((item, index) => (
          <div
            className="slider-item"
            key={index}
            ref={(element: HTMLDivElement) => (sliderItemRef.current[index] = element)}
          >
            <div className="slider-item-gradient" />
            {item.url.split(".").at(-1) === "mp4" ? <Video src={item.url} autoPlay={false} /> : <img src={item.url} />}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BoardCarousel;
