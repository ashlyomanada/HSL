import Button from "@/components/buttons/Button";
import React from "react";
import aboutImage from "@/assets/about.webp";
import { useLocation } from "react-router-dom";

const AboutPage = () => {
  const location = useLocation();

  return (
    <div
      className={`h-[80vh] xl:h-[80vh] relative flex items-center px-5 xl:px-20 ${
        location.pathname === "/about" ? "mt-28 mb-16" : ""
      }`}
    >
      <div className="flex logo h-full w-[56%] bg-[darkBlue] absolute left-0 z-0"></div>
      <div className="flex logo2 h-full w-[56%] bg-[#eb2e4c] absolute right-0"></div>

      <div className="grid md:grid-cols-2 z-20 h-[70vh] md:h-[50vh]">
        <div className="flex flex-col text-white justify-center items-start gap-5">
          <h2 className="text-5xl font-bold">About the League</h2>
          <p className="md:w-[90%] lg:w-[80%]">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia Even the all-powerful Pointing has no
            control about the blind texts it is an almost unorthographic life
            One day however a small line of blind text by the name of Lorem
            Ipsum decided to leave for the far World of Grammar.
          </p>
          <Button color={"#eb2e4c"}>Read more</Button>
        </div>
        <div className="hidden md:flex relative items-center">
          <img
            src={aboutImage}
            alt=""
            className="absolute md:h-[80vh] xl:h-[90vh] w-full object-cover shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
