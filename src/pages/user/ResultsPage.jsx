import React from "react";
import Header from "../../components/shared/Header";

const ResultsPage = () => {
  return (
    <div className="flex flex-col gap-10 justify-center min-h-[50vh] items-center bg-[#23284c] py-10">
      <Header isTextWhite={true}>Latest Results</Header>
      <div className="grid md:grid-cols-3 gap-5 md:gap-0 lg:w-1/2">
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-36"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="text-white font-semibold text-lg">OKC THUNDER</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 text-white">
          <p className="font-semibold text-2xl text-center">
            Basketball League
          </p>
          <div className="flex items-center justify-center gap-5">
            <div className="flex bg-[#0034a7] rounded-xl p-3">
              <p className="text-3xl text-white text-center font-semibold">
                97
              </p>
            </div>
            <div className="flex bg-[#0034a7] rounded-xl p-3">
              <p className="text-3xl text-white text-center font-semibold">
                97
              </p>
            </div>
          </div>

          <p>Today, May 28, 2025</p>
        </div>
        <div className="flex flex-col items-center gap-5">
          <img
            className="rounded-full h-36"
            src="https://m.media-amazon.com/images/I/71tcws7iTTL.jpg"
            alt=""
          />
          <p className="text-white font-semibold text-lg">L.A. Lakers</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
