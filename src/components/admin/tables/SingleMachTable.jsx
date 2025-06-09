import React from "react";
import { format, isValid } from "date-fns";

const SingleMatchTable = ({ match, loading, handleDelete }) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl flex flex-col">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">Team A</th>
            <th className="text-center"></th>
            <th className="text-center">Team B</th>
            <th className="text-center">Schedule</th>
            <th className="text-center">Venue</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : match ? (
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={`${url}${match?.team_a?.school?.logo_url}`}
                        alt="Team A Logo"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{match?.team_a?.name}</div>
                    <div className="text-sm opacity-50">
                      {match?.team_a?.school?.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="font-semibold text-center">VS</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={`${url}${match?.team_b?.school?.logo_url}`}
                        alt="Team B Logo"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{match?.team_b?.name}</div>
                    <div className="text-sm opacity-50">
                      {match?.team_b?.school?.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {isValid(new Date(match?.scheduled_datetime))
                  ? format(
                      new Date(match.scheduled_datetime),
                      "MMM d, yyyy, h:mm:ss a"
                    )
                  : "N/A"}
              </td>
              <td className="text-center">{match?.venue || "N/A"}</td>
              <td className="text-center">{match?.status || "Pending"}</td>
              <td>
                <div className="flex items-center gap-3">
                  <button
                    className="btn btn-warning btn-small"
                    onClick={() =>
                      window.location.assign(`/admin/match/${match.id}`)
                    }
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span className="hidden md:flex"> edit</span>
                  </button>
                  <button
                    className="btn btn-error btn-small"
                    onClick={() => handleDelete(match.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span className="hidden md:flex">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Match to edit.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SingleMatchTable;
