import React from "react";

const Header = ({ children, isTextWhite = false }) => {
  return (
    <h1
      className={`text-center text-3xl md:text-4xl font-semibold ${
        isTextWhite ? "text-white" : "text-black"
      }`}
    >
      {children}
    </h1>
  );
};

export default Header;
