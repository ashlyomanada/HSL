import { useState, useEffect, useRef } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMatches } from "@/services/matches";
import Loader2 from "./loader/Loader2";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MatchCalendar = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getMatches();
        const transformedMatches = response.map((match) => {
          const start = new Date(match.scheduled_datetime);
          const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2 hours

          return {
            id: match.id,
            title: `${match.team_a.name} vs ${match.team_b.name}`,
            start,
            end,
            venue: match.venue,
            status: match.status,
            category: match.league?.category?.category || "No category", // <-- here
            teamA: match.team_a,
            teamB: match.team_b,
          };
        });

        setMatches(transformedMatches);
      } catch (error) {
        console.error("Error Fetching data:", error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMatch && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedMatch]);

  const handleSelectEvent = (event) => {
    setSelectedMatch(event);
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setSelectedMatch(null);
  };

  return (
    <div className="p-4 bg-white shadow-xl rounded-lg">
      {loading ? (
        <Loader2 />
      ) : (
        <Calendar
          localizer={localizer}
          events={matches}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          style={{ height: 450 }}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          toolbar={true}
          popup
        />
      )}

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {selectedMatch && (
            <>
              <p>
                <strong>Date:</strong> {format(selectedMatch.start, "PPpp")}
              </p>
              <p>
                <strong>End:</strong> {format(selectedMatch.end, "PPpp")}
              </p>
              <p>
                <strong>Location:</strong> {selectedMatch.venue}
              </p>
              <p>
                <strong>Status:</strong> {selectedMatch.status}
              </p>
              <p>
                <strong>Sports:</strong> {selectedMatch.category}
              </p>
              <p>
                <strong>Match:</strong> {selectedMatch.teamA.name} vs{" "}
                {selectedMatch.teamB.name}
              </p>

              <div className="modal-action mt-4">
                <form method="dialog">
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MatchCalendar;
