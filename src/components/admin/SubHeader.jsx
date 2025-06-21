import React from "react";

const SubHeader = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center">
      {children}
    </div>
  );
};

export default SubHeader;
