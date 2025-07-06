import Header from "@/components/user/Header";
import React, { useEffect, useState } from "react";
import nextMacthImg from "@/assets/nextMatch.webp";
import ScheduleCard from "@/components/user/cards/ScheduleCard";
import { nextMatch } from "@/services/matches";
import CardLoader from "@/components/user/loader/CardLoader";

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMatch = async () => {
      setLoading(true);
      try {
        const response = await nextMatch({ status: "Not Started" });
        const sliced = response.slice(0, 4);
        setMatches(sliced);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, []);
  return (
    <div className="lg:min-h-screen flex flex-col py-10 lg:py-20 gap-10">
      <Header subHeader={"SCHEDULE"} header={"NEXT MATCH"} />

      <div className="flex px-5 xl:px-20 gap-8">
        <div className="hidden md:flex w-[60%]">
          <img
            className="h-full w-full object-cover"
            src={nextMacthImg}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full md:w-[40%] gap-3">
          {!loading ? (
            matches.map((match) => (
              <ScheduleCard key={match.id} match={match} />
            ))
          ) : (
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
