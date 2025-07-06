import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../../slides.css";

const Slides = ({ teams = [], loading }) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  const [chunkSize, setChunkSize] = useState(1);
  const [chunkedTeams, setChunkedTeams] = useState([]);

  useEffect(() => {
    const calculateChunkSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 5;
      if (width >= 768) return 3;
      return 1;
    };

    const handleResize = () => setChunkSize(calculateChunkSize());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const chunkArray = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };
    setChunkedTeams(chunkArray(teams, chunkSize));
  }, [teams, chunkSize]);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={chunkedTeams.length > 1 ? { delay: 4000 } : false}
        loop={chunkedTeams.length > 1}
        className="mySwiper"
      >
        {chunkedTeams.length > 0 ? (
          chunkedTeams.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center gap-4 py-8">
                {group.map((team) => (
                  <div
                    key={team.id}
                    className="flex flex-col items-center justify-center"
                  >
                    <img
                      src={`${url}${team.school.logo_url}`}
                      className="h-44 w-4h-44 object-contain"
                      alt={team.school.name}
                    />
                    <p className="text-white text-sm mt-2 text-center max-w-[120px]">
                      {team.school.name}
                    </p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="flex items-center justify-center w-full h-56 text-white bg-gray-500">
              No teams available
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Custom white chevrons */}
      <div className="custom-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-white hover:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      <div className="custom-next absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-white hover:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default Slides;
