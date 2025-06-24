import React, { forwardRef } from "react";

const ResultsModal = forwardRef(
  (
    {
      handleSubmit,
      handleChange,
      form,
      teams,
      logoUrlA,
      logoUrlB,
      matchStatus,
      setMatchStatus,
      submitLoading,
      handleCloseModal,
    },
    modalRef
  ) => {
    return (
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
                <p>{teams.teamAName}</p>
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
              <div className="flex flex-col items-center justify-center">
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
                <p>{teams.teamBName}</p>
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

            <label className="select border border-gray-300 w-full">
              <span className="label">Status</span>
              <select
                name="status"
                value={matchStatus.status}
                onChange={(e) => {
                  setMatchStatus((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Finished">Finished</option>
              </select>
            </label>

            <div className="flex justify-center items-center gap-3">
              <button
                type="submit"
                className={`btn btn-success btn-medium ${
                  submitLoading ? "text-black" : "text-white"
                }`}
                disabled={submitLoading}
              >
                {submitLoading ? "Updating... Score" : "Update Score"}
              </button>
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

export default ResultsModal;
