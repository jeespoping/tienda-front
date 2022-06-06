import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
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
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImagen = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <Image
            onClick={() => openImagen(screenshot.url)}
            key={screenshot.id}
            src={screenshot.url}
            alt={screenshot.name}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
