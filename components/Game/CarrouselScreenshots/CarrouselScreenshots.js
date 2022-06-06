import React from "react";
import { Image } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const settings = {
  className: "carrousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipeToSlider: true,
};

export default function CarrouselScreenshots({ title, screenshots }) {
  return (
    <Slider {...settings}>
      {map(screenshots, (screenshot) => (
        <Image
          onClick={() => console.log("Abrir imagen")}
          key={screenshot.id}
          src={screenshot.url}
          alt={screenshot.name}
        />
      ))}
    </Slider>
  );
}
