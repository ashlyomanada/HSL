import React, { useMemo } from "react";

const ScheduleCard = ({ match }) => {
  const formattedDate = useMemo(() => {
    if (!match?.scheduled_datetime) return "";
    const date = new Date(match.scheduled_datetime);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const options = { month: "long", day: "numeric", year: "numeric" };
    return (
      (isToday ? "Today, " : "") + date.toLocaleDateString("en-US", options)
    );
  }, [match?.scheduled_datetime]);

  const url = import.meta.env.VITE_STORAGE_URL;
  return (
    <>
      <div className="flex flex-col items-center w-full gap-2 bg-white px-5 xl:px-20 py-5 rounded-xl shadow-xl border border-gray-300">
        {match?.scheduled_datetime ? (
          <p className="text-black font-semibold text-center">
            {formattedDate}
          </p>
        ) : (
          <div className="skeleton h-5 w-full"></div>
        )}

        {match?.venue ? (
          <p className="text-center text-xs text-gray-700">@{match?.venue}</p>
        ) : (
          <div className="skeleton h-5 w-[60%]"></div>
        )}

        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            {match?.team_a?.school?.logo_url ? (
              <img
                className="rounded-full h-20 w-20 object-contain"
                src={`${url}/${match?.team_a?.school?.logo_url}`}
                alt=""
              />
            ) : (
              <div className="skeleton rounded-full h-20 w-20"></div>
            )}

            {match?.team_a?.name ? (
              <p className="text-black text-xs md:text-sm font-bold text-center">
                {match?.team_a?.name}
              </p>
            ) : (
              <div className="skeleton h-5 w-[60%]"></div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-3 lg:gap-10 text-white">
            <div className="flex items-center justify-center gap-5">
              {match?.team_a?.name && match?.team_b?.name ? (
                <div className="flex bg-[#0034a7] rounded-full p-3 h-10 w-10 items-center justify-center">
                  <p className="text-white text-center font-semibold">VS</p>
                </div>
              ) : (
                <span className="skeleton rounded-full p-3 h-10 w-10"></span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            {match?.team_b?.school?.logo_url ? (
              <img
                className="rounded-full h-20 w-20 object-contain"
                src={`${url}/${match?.team_b?.school?.logo_url}`}
                alt=""
              />
            ) : (
              <div className="skeleton rounded-full h-20 w-20"></div>
            )}

            {match?.team_b?.name ? (
              <p className="text-black text-xs md:text-sm font-bold text-center">
                {match?.team_b?.name}
              </p>
            ) : (
              <div className="skeleton h-5 w-[60%]"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleCard;
