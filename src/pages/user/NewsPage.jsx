import React from "react";
import Section from "../../components/user/Section";
import Header from "../../components/shared/Header";

const NewsPage = () => {
  return (
    <Section>
      <Header>Our News</Header>

      <div className="flex flex-col lg:flex-row justify-center w-full gap-5">
        <div className="flex lg:h-[70vh] items-stretch lg:w-[60%]">
          <img
            className="rounded-xl -full w-full object-cover"
            src="https://t4.ftcdn.net/jpg/08/84/34/17/360_F_884341734_YynhUdil6YkGNxO35cZoyXeu2h8uz9ct.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col overflow-hidden lg:h-[70vh] lg:w-[40%] gap-5">
          <div className="flex h-[47.5%]">
            <img
              className="rounded-xl w-full object-cover"
              src="https://www.york.ac.uk/media/study-new/undergraduate/sports-800-a.jpg"
              alt=""
            />
          </div>
          <div className="flex h-[47.5%]">
            <img
              className="rounded-xl w-full object-cover"
              src="https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fgomarquette.com%2Fimages%2F2025%2F3%2F13%2F20250313_MB_1001_AD.jpg&height=1100&type=webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NewsPage;
