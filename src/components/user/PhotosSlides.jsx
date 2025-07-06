import React, { useEffect, useState } from "react";
import { initCarousels } from "flowbite";
import CardLoader from "./loader/CardLoader";

const PhotosSlides = ({ teams = [], loading }) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  const [chunkSize, setChunkSize] = useState(1);
  const [chunkedTeams, setChunkedTeams] = useState([]);

  // Handle screen size and chunking logic
  useEffect(() => {
    const calculateChunkSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 5; // lg
      if (width >= 768) return 3; // md
      return 1; // sm
    };

    const handleResize = () => {
      const size = calculateChunkSize();
      setChunkSize(size);
    };

    handleResize(); // initial run
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recalculate chunked slides when teams or chunkSize changes
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

  useEffect(() => {
    if (!loading && teams?.length > 0) {
      initCarousels(); // re-initialize carousel when teams change
    }
  }, [loading, teams, chunkedTeams]);

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {!loading ? (
          chunkedTeams.length > 0 ? (
            chunkedTeams.map((group, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? "block" : "hidden"
                } duration-700 ease-in-out`}
                data-carousel-item
              >
                <div className="absolute flex justify-center items-center gap-4 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {group.map((team) => (
                    <div
                      key={team.id}
                      className="flex flex-col items-center justify-center"
                    >
                      <img
                        src={`${url}${team.school.logo_url}`}
                        className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-contain"
                        alt={team.school.name}
                      />
                      <p className="text-white text-sm mt-2 text-center max-w-[120px]">
                        {team.school.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="block duration-700 ease-in-out" data-carousel-item>
              <div className="flex items-center justify-center w-full h-full text-white bg-gray-500">
                No teams available
              </div>
            </div>
          )
        ) : (
          <div className="block duration-700 ease-in-out" data-carousel-item>
            <CardLoader />
          </div>
        )}
      </div>

      {/* Pagination indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(chunkedTeams.length || 1)].map((_, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

      {/* Prev button */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      {/* Next button */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default PhotosSlides;
