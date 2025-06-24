import React from "react";
import NoData from "@/assets/NoData.png";

const Empty = ({ message, categoryName }) => {
  return (
    <div className=" flex flex-col w-full items-center justify-center min-h-[450px] rounded-lg bg-white shadow-lg">
      <img src={NoData} alt="" className="h-64 object-contain" />
      <p className="text-lg font-bold">
        {message} {categoryName}
      </p>
    </div>
  );
};

export default Empty;
