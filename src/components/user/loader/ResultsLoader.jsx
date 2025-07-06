import React from "react";

const ResultsLoader = () => {
  return (
    <div className="carousel-item w-full md:w-auto h-[50vh] flex items-center">
      <div className="grid grid-cols-3 md:gap-0 relative bg-white py-5 rounded-xl w-full">
        <div className="flex flex-col items-center justify-center gap-5 pt-10 lg:pt-0">
          <span className="skeleton rounded-full h-10 md:h-22 lg:h-32 w-10 md:w-22 lg:w-32"></span>
          <span className="skeleton h-5 w-22"></span>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 md:gap-10 text-white">
          <span className="skeleton h-5 w-22"></span>
          <div className="flex items-center justify-center gap-3 md:gap-5">
            <span className="skeleton rounded-xl p-2 md:p-3 h-10 w-10 lg:h-20 lg:w-16"></span>
            <span className="skeleton rounded-xl p-2 md:p-3 h-10 w-10 lg:h-20 lg:w-16"></span>
          </div>
          <span className="skeleton h-5 w-22"></span>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 pt-10 lg:pt-0">
          <span className="skeleton rounded-full h-10 md:h-22 lg:h-32 w-10 md:w-22 lg:w-32"></span>
          <span className="skeleton h-5 w-22"></span>
        </div>
      </div>
    </div>
  );
};

export default ResultsLoader;
