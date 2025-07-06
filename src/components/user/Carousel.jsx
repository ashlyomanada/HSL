import React from "react";

const Carousel = ({ children }) => {
  return (
    <div className="carousel carousel-start rounded-box flex gap-3 lg:gap-5 ">
      {children}
    </div>
  );
};

export default Carousel;
