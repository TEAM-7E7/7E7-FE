import { ImageMapDto } from "../dto/BoardDto";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Video } from "../elements/Video";
import React from "react";
import "../styles/components/boardcarousel.scss";
interface BoardCarouselDto {
  imageMapList: ImageMapDto[];
}

const settings = {
  className: "slider-items",
  infinite: true,
  speed: 500,
  slideToShow: 1,
  dots: true,
  arrows: false,
};

const BoardCarousel = ({ imageMapList }: BoardCarouselDto) => {
  console.log(imageMapList);
  return (
    <div className="boardcarousel-wrapper">
      <Slider {...settings}>
        {imageMapList.map((item, index) => (
          <div className="slider-item" key={index}>
            <div className="slider-item-gradient" />
            {item.url.split(".").at(-1) === "mp4" ? <Video src={item.url} autoPlay={true} /> : <img src={item.url} />}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BoardCarousel;
