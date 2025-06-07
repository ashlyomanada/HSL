import React, { useEffect, useRef, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import ScheduleTable from "@/components/admin/tables/ScheduleTable";
import { getLeagues, getSelectedLeagues } from "@/services/league";
import { getTeams } from "@/services/team";
import {
  createMatches,
  deleteMatches,
  getMatches,
  updateMatches,
} from "@/services/matches";
import Swal from "sweetalert2";
import { set } from "date-fns";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [form, setForm] = useState({
    league_id: "",
    team_a_id: "",
    team_b_id: "",
    scheduled_datetime: "",
    venue: "",
    status: "Not Started",
    referee_id: 1,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const modalRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finishedFormTeamA, setFinishedFormTeamA] = useState({
    league_id: "",
    team_id: "",
    wins: "",
    loses: "",
    draws: "",
    points: "",
    rank: "",
  });

  const [finishedFormTeamB, setFinishedFormTeamB] = useState({
    league_id: "",
    team_id: "",
    wins: "",
    loses: "",
    draws: "",
    points: "",
    rank: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateMatches(editingId, form);
      Swal.fire({
        title: "Success!",
        text: "Match created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      if (form.status === "Finished") {
      }
    } else {
      const response = await createMatches(form);
      Swal.fire({
        title: "Success!",
        text: "Match created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setMatches(response);
    }

    modalRef.current.close();
    const response = await getMatches();
    setMatches(response);
    setEditingId(null);
  };

  const handleModalClose = () => {
    modalRef.current.close();
    setEditingId(null);
    setForm({
      league_id: "",
      team_a_id: "",
      team_b_id: "",
      scheduled_datetime: "",
      venue: "",
      status: "Not Started",
      referee_id: 1,
    });
  };

  useEffect(() => {
    const fetchSelectedLeague = async () => {
      try {
        if (form.league_id) {
          const response = await getSelectedLeagues(form.league_id);
          setStartDate(response.start_date);
          setEndDate(response.end_date);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSelectedLeague();
  }, [form.league_id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const matchesRes = await getMatches();
        const leagueRes = await getLeagues();
        const teamRes = await getTeams();

        setMatches(matchesRes);
        setLeagues(leagueRes);
        setTeams(teamRes);
      } catch (error) {
        console.error("Error Fetching datas:", error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (matches) => {
    modalRef.current.showModal();
    setEditingId(matches.id);
    setForm({
      league_id: matches.league_id,
      team_a_id: matches.team_a_id,
      team_b_id: matches.team_b_id,
      scheduled_datetime: matches.scheduled_datetime,
      venue: matches.venue,
      status: "Not Started",
      referee_id: 1,
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    try {
      if (result.isConfirmed) {
        await deleteMatches(id);
        setMatches((prev) => prev.filter((match) => match.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The Match has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete the League.", "error");
    }
  };

  // Filter teamB options to exclude teamA
  const filteredTeamsB = teams.filter(
    (team) => team.id !== parseInt(form.team_a_id)
  );

  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">Matches</h2>
        <button className="btn" onClick={() => modalRef.current.showModal()}>
          Add Matches
        </button>
      </SubHeader>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* League Select */}
            <label className="select border border-gray-300 w-full">
              <span className="label">Sport</span>
              <select
                name="league_id"
                value={form.league_id}
                onChange={handleFormChange}
                required
              >
                <option value="">-- Choose Sport --</option>
                {leagues.map((league) => (
                  <option key={league.id} value={league.id}>
                    {league.category}
                  </option>
                ))}
              </select>
            </label>

            {/* Team A & Team B */}
            <div className="flex gap-5 items-center">
              <label className="select border border-gray-300 w-full">
                <span className="label">Team A</span>
                <select
                  required
                  name="team_a_id"
                  value={form.team_a_id}
                  onChange={handleFormChange}
                >
                  <option value="">-- Choose Team A --</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </label>

              <h1>VS</h1>

              <label className="select border border-gray-300 w-full">
                <span className="label">Team B</span>
                <select
                  required
                  name="team_b_id"
                  value={form.team_b_id}
                  onChange={handleFormChange}
                >
                  <option value="">-- Choose Team B --</option>
                  {filteredTeamsB.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Schedule Date */}
            <label className="input border border-gray-300 w-full">
              <span className="label">Schedule</span>
              <input
                required
                type="datetime-local"
                name="scheduled_datetime"
                value={form.scheduled_datetime}
                onChange={handleFormChange}
                min={startDate}
                max={endDate}
              />
            </label>

            {/* Venue */}
            <label className="input border border-gray-300 w-full">
              <span className="label">Venue</span>
              <input
                required
                type="text"
                name="venue"
                value={form.venue}
                placeholder="Enter Venue"
                onChange={handleFormChange}
              />
            </label>

            {/* Status */}
            <label className="select border border-gray-300 w-full">
              <span className="label">Status</span>
              <select
                name="status"
                value={form.status}
                onChange={handleFormChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Finished">Finished</option>
              </select>
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="btn btn-success btn-medium text-white"
              >
                Submit
              </button>
              <div className="btn btn-medium" onClick={handleModalClose}>
                Close
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <ScheduleTable
        matches={matches}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </AdminSection>
  );
};

export default Matches;
