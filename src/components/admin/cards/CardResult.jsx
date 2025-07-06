import React from "react";

const CardResult = ({ match, handleEdit, handleConvertDate, url }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-[darkBlue] rounded-lg shadow-md p-5 relative">
      <button
        className="absolute right-0 top-0 text-white p-5 text-xl cursor-pointer"
        onClick={() => handleEdit(match)}
      >
        <i className="fa-solid fa-pen-to-square"></i>
      </button>
      <h1 className="text-white">
        {handleConvertDate(match.scheduled_datetime)}
      </h1>
      <div className="flex gap-3 lg:gap-10 items-center">
        <div className="flex flex-col items-center justify-center gap-3">
          {match?.team_a?.school?.logo_url && (
            <img
              src={
                match?.team_a?.school?.logo_url?.trim()
                  ? `${url}${match.team_a.school.logo_url}`
                  : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
              }
              alt="Team A Logo"
              className="h-16 w-16 rounded-full"
            />
          )}

          <p className="text-white text-center">{match.team_a.name}</p>
          <h2 className="text-white font-bold text-2xl">
            {match.status === "Not Started"
              ? 0
              : match?.score?.team_a_score ?? 0}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <h2 className="text-2xl font-semibold text-white">VS</h2>
          <h1 className="text-white">{match.status}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          {match?.team_b?.school?.logo_url && (
            <img
              src={
                match?.team_b?.school?.logo_url?.trim()
                  ? `${url}${match.team_b.school.logo_url}`
                  : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
              }
              alt="Team A Logo"
              className="h-16 w-16 rounded-full"
            />
          )}

          <p className="text-white text-center">{match.team_b.name}</p>
          <h2 className="text-white font-bold text-2xl">
            {match.status === "Not Started"
              ? 0
              : match?.score?.team_b_score ?? 0}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CardResult;
