import React, { forwardRef } from "react";

const MatchesModal = forwardRef(
  (
    {
      handleSubmit,
      form,
      leagues,
      handleFormChange,
      filteredTeamsB,
      startDate,
      endDate,
      handleModalClose,
      teams,
    },
    modalRef
  ) => {
    return (
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
    );
  }
);

export default MatchesModal;
