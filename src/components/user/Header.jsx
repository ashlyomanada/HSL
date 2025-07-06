import React from "react";

const Header = ({ header, subHeader }) => {
  return (
    <div className="flex flex-col justify-center gap-0 md:gap-3">
      <h3 className="text-center text-gray-500">{subHeader}</h3>
      <h1 className="font-bold text-2xl md:text-4xl text-center">{header}</h1>
    </div>
  );
};

export default Header;
