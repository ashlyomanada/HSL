import React from "react";

const TeamsTable = ({ teams, handleEdit, handleDelete, loading }) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>School</th>
            <th className="text-center">Category</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-5">
                Loading...
              </td>
            </tr>
          ) : teams?.length > 0 ? (
            teams.map((team) => (
              <tr key={team.id}>
                <td>
                  <p className="font-semibold">{team.name}</p>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    {team.school?.logo_url && (
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={`${url}/${team.school.logo_url}`}
                            alt={`${team.school.name} Logo`}
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold">{team.school?.name}</div>
                      <div className="text-sm opacity-50">
                        {team.school?.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">{team.category}</td>
                <td>
                  <div className="flex gap-3 items-center justify-center">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(team)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hidden md:flex"> edit</span>
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(team.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                      <span className="hidden md:flex">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-5">
                No Teams Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTable;
