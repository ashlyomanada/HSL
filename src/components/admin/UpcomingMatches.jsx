import React, { useState, useEffect } from "react";
import { nextMatch } from "@/services/matches";
import ScheduleCard from "../user/cards/ScheduleCard";
import CardLoader from "../user/loader/CardLoader";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMatch = async () => {
      setLoading(true);
      try {
        const response = await nextMatch({ status: "Not Started" });
        const sliced = response.slice(0, 3);
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
    <div className="flex flex-col w-full gap-3">
      {!loading ? (
        matches.map((match) => <ScheduleCard key={match.id} match={match} />)
      ) : (
        <>
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </>
      )}
    </div>
  );
};

export default UpcomingMatches;
