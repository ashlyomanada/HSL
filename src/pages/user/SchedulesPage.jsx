import React from "react";
import Section from "../../components/user/Section";
import Header from "../../components/shared/Header";

const SchedulesPage = () => {
  return (
    <Section>
      <Header>Game Schedules</Header>
      <div className="grid lg:grid-cols-2 gap-5">
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
      </div>
    </Section>
  );
};

const ScheduleCard = () => {
  return (
    <div className="flex">
      <div className="grid grid-cols-3 bg-[#23284c] px-5 md:px-10 py-5 rounded-3xl">
        <div className="flex flex-col items-center gap-3 md:gap-5">
          <img
            className="rounded-full md:h-28 object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdFR7JYNV9f3UfiJK2rMDZmrFpKsLb1jFgJA&s"
            alt=""
          />
          <p className="text-white font-semibold text-center">OKC THUNDER</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 lg:gap-10 text-white">
          <div className="flex items-center justify-center gap-5">
            <div className="flex bg-[#0034a7] rounded-xl p-3">
              <p className="text-3xl text-white text-center font-semibold">
                VS
              </p>
            </div>
          </div>

          <p className="font-semibold text-center">Tomorrow, May 29, 2025</p>
        </div>
        <div className="flex flex-col items-center gap-3 md:gap-5">
          <img
            className="rounded-full md:h-28 object-cover"
            src="https://m.media-amazon.com/images/I/71tcws7iTTL.jpg"
            alt=""
          />
          <p className="text-white font-semibold text-center">L.A. Lakers</p>
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
