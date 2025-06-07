import AdminSection from "@/components/admin/AdminSection";
import Table from "@/components/admin/tables/SchoolsTable";
import StandingsTable from "@/components/admin/tables/StandingsTable";
import { getStandings } from "@/services/standings";
import React, { useEffect, useState } from "react";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getStandings();
        setStandings(response);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <AdminSection>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Team Standings</h2>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add Team
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <input type="datetime-local" name="" id="" />
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog> */}
      </div>

      <StandingsTable standings={standings} loading={loading} />
    </AdminSection>
  );
};

export default Standings;
