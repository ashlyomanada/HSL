import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import { nextMatch } from "@/services/matches";
import ResultsLoader from "@/components/user/loader/ResultsLoader";
import ResultCard from "@/components/user/cards/ResultCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../../slides.css";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chunkedResults, setChunkedResults] = useState([]);
  const [chunkSize, setChunkSize] = useState(1);

  // Calculate screen width and chunk accordingly
  useEffect(() => {
    const getChunkSize = () => (window.innerWidth > 1200 ? 2 : 1);
    const resizeListener = () => {
      const size = getChunkSize();
      setChunkSize(size);
    };

    resizeListener(); // Run on load
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  // Fetch results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await nextMatch({ status: "Finished" });
        setResults(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Chunk the results when either `results` or `chunkSize` changes
  useEffect(() => {
    const chunkArray = (arr, size) => {
      const chunked = [];
      for (let i = 0; i < arr.length; i += size) {
        chunked.push(arr.slice(i, i + size));
      }
      return chunked;
    };

    setChunkedResults(chunkArray(results, chunkSize));
  }, [results, chunkSize]);

  return (
    <div className="flex flex-col gap-5 justify-center min-h-[50vh] bg-white py-10">
      <Header subHeader={"GAME REPORT"} header={"LATEST GAME RESULT"} />

      <div className="flex h-[50vh] px-5 xl:px-20 relative items-center w-full">
        <div className="flex logo h-[50vh] w-[56%] bg-[darkBlue] absolute left-0 top-0"></div>
        <div className="flex logo2 h-[50vh] w-[56%] bg-[#eb2e4c] absolute right-0 top-0"></div>

        <div className="w-full z-10">
          {loading ? (
            <div className="flex items-center justify-center gap-4">
              <ResultsLoader />
              <div className="hidden lg:flex">
                <ResultsLoader />
              </div>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              pagination={{ clickable: true }}
              autoplay={chunkedResults.length > 1 ? { delay: 4000 } : false}
              loop={chunkedResults.length > 1}
              className="mySwiper"
            >
              {chunkedResults.map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col xl:flex-row items-center justify-center gap-5">
                    {group.map((result) => (
                      <ResultCard key={result.id} result={result} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Custom arrows */}
          <div className="custom-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white hover:text-gray-300">
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

          <div className="custom-next absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white hover:text-gray-300">
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
