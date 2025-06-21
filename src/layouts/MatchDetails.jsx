import React, { useEffect, useRef, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import ScheduleTable from "@/components/admin/tables/ScheduleTable";
import {
  getLeagueCategory,
  getLeagues,
  getSelectedLeagues,
} from "@/services/league";
import { getCategoryType } from "@/services/team";
import {
  createMatches,
  deleteMatches,
  getMatchesCategory,
  updateMatches,
} from "@/services/matches";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const MatchDetails = () => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState(null);
  const [teams, setTeams] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const modalRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, name } = useParams();
  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  const [form, setForm] = useState({
    league_id: "",
    team_a_id: "",
    team_b_id: "",
    scheduled_datetime: "",
    venue: "",
    status: "Not Started",
    referee_id: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMatches(editingId, form);
        Swal.fire({
          title: "Success!",
          text: "Match updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
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
      const matchesRes = await getMatchesCategory({
        category_id: parseInt(id),
        status: "Not Started",
      });
      setMatches(matchesRes);
      setEditingId(null);
      setCurrentPage(1); // Reset pagination
    } catch (error) {
      console.error(error);
    }
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
        if (id) {
          const matchesRes = await getMatchesCategory({
            category_id: parseInt(id),
            status: "Not Started",
          });
          const leagueRes = await getLeagueCategory({
            category_id: parseInt(id),
          });
          const teamRes = await getCategoryType({
            category_id: parseInt(id),
          });

          setMatches(matchesRes);
          setLeagues(leagueRes);
          setTeams(teamRes);
        }
      } catch (error) {
        console.error("Error Fetching data:", error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (match) => {
    modalRef.current.showModal();
    setEditingId(match.id);
    setForm({
      league_id: match.league_id,
      team_a_id: match.team_a_id,
      team_b_id: match.team_b_id,
      scheduled_datetime: match.scheduled_datetime,
      venue: match.venue,
      status: match.status,
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
        const updatedMatches = matches.filter((match) => match.id !== id);
        setMatches(updatedMatches);
        Swal.fire({
          title: "Deleted!",
          text: "The Match has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        const totalPages = Math.ceil(updatedMatches.length / categoriesPerPage);
        if (currentPage > totalPages) setCurrentPage(totalPages);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete the match.", "error");
    }
  };

  const filteredTeamsB = teams.filter(
    (team) => team.id !== parseInt(form.team_a_id)
  );

  // Pagination logic
  const indexOfLastMatch = currentPage * categoriesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - categoriesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(matches.length / categoriesPerPage);

  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">{name || "Sports"} Matches</h2>
        <div className="flex items-center gap-3">
          <button className="btn" onClick={() => modalRef.current.showModal()}>
            Add Matches
          </button>
          <button className="btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </SubHeader>

      {/* Modal */}
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
                {leagues && (
                  <option value={leagues.id}>
                    {leagues.category?.category ||
                      "No Teams yet for this Sport"}
                  </option>
                )}
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

      {/* Match Table */}
      <ScheduleTable
        matches={currentMatches}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 p-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminSection>
  );
};

export default MatchDetails;
