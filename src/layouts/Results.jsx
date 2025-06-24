import AdminSection from "@/components/admin/AdminSection";
import CardResult from "@/components/admin/cards/CardResult";
import Empty from "@/components/admin/Empty";
import Loader2 from "@/components/admin/loader/Loader2";
import ResultsModal from "@/components/admin/modals/ResultsModal";
import SubHeader from "@/components/admin/SubHeader";
import {
  updateMatches,
  getMatchesCategory,
  getMatches,
} from "@/services/matches";
import { createScores, updateScores } from "@/services/scores";
import { createStandings, getTeamStanding } from "@/services/standings";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [logoUrlA, setLogoUrlA] = useState(null);
  const [logoUrlB, setLogoUrlB] = useState(null);
  const [matchStatus, setMatchStatus] = useState({
    league_id: "",
    team_a_id: "",
    team_b_id: "",
    scheduled_datetime: "",
    venue: "",
    status: "",
    referee_id: 1,
  });

  const [standingTeamA, setStandingTeamA] = useState({
    league_id: "",
    team_id: "",
    wins: "",
    loses: "",
    draws: "",
    points: "",
    rank: "",
  });

  const [standingTeamB, setStandingTeamB] = useState({
    league_id: "",
    team_id: "",
    wins: "",
    loses: "",
    draws: "",
    points: "",
    rank: "",
  });
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState({ teamAName: "", teamBName: "" });
  const [status, setStatus] = useState("Not Started");

  const url = import.meta.env.VITE_STORAGE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await createScores(form);
      await updateMatches(editingId, matchStatus);

      if (matchStatus.status === "Finished") {
        const responseTeamA = await getTeamStanding({
          league_id: matchStatus.league_id,
          team_id: matchStatus.team_a_id,
        });

        const responseTeamB = await getTeamStanding({
          league_id: matchStatus.league_id,
          team_id: matchStatus.team_b_id,
        });

        let winsA = responseTeamA?.wins || 0;
        let lossesA = responseTeamA?.losses || 0;
        let drawsA = responseTeamA?.draws || 0;
        let pointsA = responseTeamA?.points || 0;

        let winsB = responseTeamB?.wins || 0;
        let lossesB = responseTeamB?.losses || 0;
        let drawsB = responseTeamB?.draws || 0;
        let pointsB = responseTeamB?.points || 0;

        if (form.team_a_score > form.team_b_score) {
          winsA += 1;
          lossesB += 1;
          pointsA += 3;
        } else if (form.team_a_score < form.team_b_score) {
          winsB += 1;
          lossesA += 1;
          pointsB += 3;
        } else {
          drawsA += 1;
          drawsB += 1;
          pointsA += 1;
          pointsB += 1;
        }

        const updatedStandingA = {
          league_id: matchStatus.league_id,
          team_id: matchStatus.team_a_id,
          wins: winsA,
          losses: lossesA,
          draws: drawsA,
          points: pointsA,
        };

        const updatedStandingB = {
          league_id: matchStatus.league_id,
          team_id: matchStatus.team_b_id,
          wins: winsB,
          losses: lossesB,
          draws: drawsB,
          points: pointsB,
        };

        setStandingTeamA(updatedStandingA);
        setStandingTeamB(updatedStandingB);

        await createStandings(updatedStandingA);
        await createStandings(updatedStandingB);
      }

      const response = await getMatchesCategory({
        category_id: parseInt(id),
        status: "Not Started",
      });
      setMatches(response);

      handleCloseModal(e);
      Swal.fire({
        title: "Success!",
        text: "Match Updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
      setSubmitLoading(true);
    } finally {
      setSubmitLoading(false);
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

    setMatchStatus({
      league_id: "",
      team_a_id: "",
      team_b_id: "",
      scheduled_datetime: "",
      venue: "",
      status: "",
      referee_id: 1,
    });

    setTeams({ teamAName: "", teamBName: "" });
  };

  const handleEdit = (match) => {
    const matchStarted = match.status !== "Finished";

    setTeams((prev) => ({ ...prev, teamAName: match.team_a.name }));
    setTeams((prev) => ({ ...prev, teamBName: match.team_b.name }));

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

      setMatchStatus({
        league_id: match.league_id,
        team_a_id: match.team_a_id,
        team_b_id: match.team_b_id,
        scheduled_datetime: match.scheduled_datetime,
        venue: match.venue,
        status: match.status,
        referee_id: 1,
      });

      setLogoUrlA(`${url}${match.team_a.school.logo_url}`);
      setLogoUrlB(`${url}${match.team_b.school.logo_url}`);
    } else {
      Swal.fire({
        text: "You can only edit scores for matches that not yet Finished.",
        icon: "warning",
        confirmButtonText: "OK",
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

  const handleStatus = async (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    setLoading(true);
    try {
      const response = await getMatchesCategory({
        category_id: id,
        status: selectedStatus,
      });
      setMatches(response);
    } catch (error) {
      console.error(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertDate = (date) => {
    const utcDate = new Date(date);
    return utcDate.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getMatchesCategory({
          category_id: id,
          status: status,
        });
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
        <h2 className="text-xl font-bold mb-4">Manage Results for {name}</h2>

        <div className="flex items-center gap-3">
          <label className="select border border-gray-300">
            <span className="label">Status</span>
            <select
              name="status"
              value={status}
              onChange={handleStatus}
              required
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
          </label>
          <button className="btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </SubHeader>

      <ResultsModal
        ref={modalRef}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        form={form}
        teams={teams}
        logoUrlA={logoUrlA}
        logoUrlB={logoUrlB}
        matchStatus={matchStatus}
        setMatchStatus={setMatchStatus}
        submitLoading={submitLoading}
        handleCloseModal={handleCloseModal}
      />

      {loading ? (
        <Loader2 />
      ) : matches?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5 relative">
          {matches.map((match) => (
            <CardResult
              key={match.id}
              match={match}
              handleEdit={handleEdit}
              handleConvertDate={handleConvertDate}
              url={url}
            />
          ))}
        </div>
      ) : (
        <Empty message={"No Match Results for"} categoryName={name} />
      )}
    </AdminSection>
  );
};

export default Results;
