import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import { getMatches } from "@/services/matches";
import { createScores, updateScores } from "@/services/scores";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Results = () => {
  const [matches, setMatches] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const modalRef = useRef(null);
  const [form, setForm] = useState({
    match_id: "",
    team_a_id: "",
    team_b_id: "",
    team_a_score: "",
    team_b_score: "",
    updated_by: 1,
  });
  const [loading, setLoading] = useState(false);
  const [logoUrlA, setLogoUrlA] = useState(null);
  const [logoUrlB, setLogoUrlB] = useState(null);
  const url = import.meta.env.VITE_STORAGE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createScores(form);
      Swal.fire({
        title: "Success!",
        text: "Match Updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      modalRef.current.close();
      const response = await getMatches();
      setMatches(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    modalRef.current.close();
    setEditingId(null);
    setForm({
      match_id: "",
      team_a_id: "",
      team_b_id: "",
      team_a_score: "",
      team_b_score: "",
      updated_by: 1,
    });
  };

  const handleEdit = (match) => {
    console.log(match);
    const matchStarted =
      match.status !== "Not Started" && match.status !== "Finished";
    const matchFinished = match.status === "Finished";

    if (matchStarted) {
      modalRef.current.showModal();
      setEditingId(match.id);
      setForm({
        match_id: match.id,
        team_a_id: match.team_a_id,
        team_b_id: match.team_b_id,
        team_a_score: match?.score?.team_a_score ?? 0,
        team_b_score: match?.score?.team_b_score ?? 0,
        updated_by: 1,
      });
      setLogoUrlA(`${url}${match.team_a.school.logo_url}`);
      setLogoUrlB(`${url}${match.team_b.school.logo_url}`);
    } else {
      Swal.fire({
        text: "You can only edit scores for matches that have In Progress.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    if (matchFinished) {
      setFinishedFormTeamA({
        league_id: "",
        team_id: "",
        wins: "",
        loses: "",
        draws: "",
        points: "",
        rank: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getMatches();
        setMatches(response);
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
      <SubHeader>
        <h2 className="text-xl font-bold mb-4">Manage Results</h2>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <div className="flex items-center gap-3">
          <select className="select border border-gray-300">
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Badminton">Badminton</option>
          </select>
          {/* <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add Results
          </button> */}
        </div>
      </SubHeader>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="hidden"
              name="match_id"
              value={form.match_id}
              onChange={handleChange}
            />
            <input
              type="hidden"
              name="team_a_id"
              value={form.team_a_id}
              onChange={handleChange}
            />
            <input
              type="hidden"
              name="team_b_id"
              value={form.team_b_id}
              onChange={handleChange}
            />

            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center justify-center gap-3">
                {logoUrlA && (
                  <img
                    className="h-24 w-24 rounded-full"
                    src={logoUrlA}
                    alt=""
                  />
                )}
                <input
                  type="number"
                  className="border border-gray-300 text-center w-1/2 text-xl py-2 rounded-lg"
                  name="team_a_score"
                  value={form.team_a_score}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <h1 className="font-bold text-3xl">VS</h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-3">
                {logoUrlB && (
                  <img
                    className="h-24 w-24 rounded-full"
                    src={logoUrlB}
                    alt=""
                  />
                )}
                <input
                  type="number"
                  className="border border-gray-300 text-center w-1/2 text-xl py-2 rounded-lg"
                  name="team_b_score"
                  value={form.team_b_score}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <button
                type="submit"
                className="btn btn-success btn-medium text-white"
              >
                Update Score
              </button>
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {loading ? (
        <>
          <div className="h-full w-full flex items-center justify-center">
            Loading Results
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {matches?.length > 0 &&
            matches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col items-center justify-center gap-5 bg-darkBlue rounded-lg shadow-md p-5 relative"
              >
                <button
                  className="absolute right-0 top-0 text-white p-5 text-xl cursor-pointer"
                  onClick={() => handleEdit(match)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <h1 className="text-white">Match Today</h1>
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

                    <p className="text-white text-center">
                      {match.team_a.name}
                    </p>
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

                    <p className="text-white text-center">
                      {match.team_b.name}
                    </p>
                    <h2 className="text-white font-bold text-2xl">
                      {match.status === "Not Started"
                        ? 0
                        : match?.score?.team_b_score ?? 0}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </AdminSection>
  );
};

export default Results;
