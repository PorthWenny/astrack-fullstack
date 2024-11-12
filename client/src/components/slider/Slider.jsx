import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
  const [imgIndex, setImgIndex] = useState(null);
  const changeSlide = (direction) => {
    setImgIndex(
      direction === "left"
        ? imgIndex === 0
          ? images.length - 1
          : imgIndex - 1
        : imgIndex === images.length - 1
        ? 0
        : imgIndex + 1
    );
  };
  return (
    <div className="Slider">
      {imgIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imgIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" className="right" alt="" />
          </div>
          <div className="close" onClick={() => setImgIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="parent">
        <img src={images[0]} alt="" onClick={() => setImgIndex(0)} />
      </div>
      <div className="child">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            onClick={() => setImgIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
