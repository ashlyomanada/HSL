import React from "react";

const CardLoader = () => {
  return (
    <div className="flex flex-col w-full bg-white px-5 xl:px-20 py-5 rounded-xl shadow-xl border border-gray-300 gap-2 transition-all duration-500 ease-in-out">
      <p className="text-black font-semibold text-center">
        <span className="skeleton h-5 w-full"></span>
      </p>
      <p className="text-center text-xs text-gray-700 flex justify-center">
        <span className="skeleton h-5 w-[50%]"></span>
      </p>
      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center gap-2">
          <span className="skeleton rounded-full h-20 w-20"></span>
          <span className="skeleton h-5 w-22"></span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 lg:gap-10 text-white">
          <div className="flex items-center justify-center gap-5">
            <span className="skeleton rounded-full p-3 h-10 w-10"></span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="skeleton rounded-full h-20 w-20"></span>
          <span className="skeleton h-5 w-22"></span>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
