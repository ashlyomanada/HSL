const ResultCard = ({ result }) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formatted = date.toLocaleDateString("en-US", options);

    return (isToday ? "Today, " : "") + formatted;
  }

  return (
    <div className="carousel-item w-full md:w-auto h-[50vh] flex items-center">
      <div className="grid grid-cols-3 md:gap-0 relative bg-white py-5 rounded-xl ">
        <div className="flex flex-col items-center justify-center gap-5 pt-10 lg:pt-0">
          <img
            className="rounded-full h-10 md:h-22 lg:h-32 lg:w-32 object-cover"
            loading="lazy"
            src={`${url}/${result?.team_a?.school?.logo_url}`}
            alt=""
          />
          <p className="text-black font-semibold md:w-full text-center">
            {result.team_a.name}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 md:gap-10 text-white">
          <p className="font-semibold text-black md:text-2xl text-center  md:w-full">
            {result?.league?.category?.category}
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-5">
            <div className="flex bg-[#0034a7] rounded-xl p-2 md:p-3">
              <p className="text-lg md:text-3xl text-white text-center font-semibold">
                {result?.score?.team_a_score}
              </p>
            </div>
            <div className="flex bg-[#0034a7] rounded-xl p-2 md:p-3">
              <p className="text-lg md:text-3xl text-white text-center font-semibold">
                {result?.score?.team_b_score}
              </p>
            </div>
          </div>
          <p className="text-center text-black">
            {formatDate(result?.updated_at)}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 pt-10 lg:pt-0">
          <img
            className="rounded-full h-10 md:h-22 lg:h-32 lg:w-32 object-cover"
            loading="lazy"
            src={`${url}/${result?.team_b?.school?.logo_url}`}
            alt=""
          />
          <p className="text-black font-semibold md:w-full text-center">
            {result.team_b.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
