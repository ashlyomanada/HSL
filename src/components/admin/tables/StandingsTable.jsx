import React from "react";
import Loader from "../loader/Loader";

const StandingsTable = ({ standings, loading }) => {
  const url = import.meta.env.VITE_STORAGE_URL;
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl flex flex-col">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">Rank</th>
            <th className="text-center">Category</th>
            <th className="text-center">Team</th>
            <th className="text-center">Wins</th>
            <th className="text-center">Loses</th>
            <th className="text-center">Draws</th>
            <th className="text-center">Points</th>
            {/* <th className="text-center">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">
                <Loader />
              </td>
            </tr>
          ) : standings?.length > 0 ? (
            standings.map((standing, index) => (
              <tr key={standing.id}>
                <td className="text-center font-semibold">{index + 1}</td>
                <td className="text-center">
                  {standing?.league?.category?.category}
                </td>
                <td>
                  <div className="flex items-center gap-3 pl-12">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`${url}${standing.team.school.logo_url}`}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{standing.team.name}</div>
                      <div className="text-sm opacity-50">
                        {standing.team.school.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">{standing.wins}</td>
                <td className="text-center">{standing.losses}</td>
                <td className="text-center">{standing.draws}</td>
                <td className="text-center">{standing.points}</td>
                {/* <td>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="btn btn-warning btn-small"
                      // onClick={() => handleEdit(team)} // should be team not school
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hidden md:flex"> edit</span>
                    </button>
                    <button
                      className="btn btn-error btn-small"
                      // onClick={() => handleDelete(team.id)} // should be team.id
                    >
                      <i className="fa-solid fa-trash"></i>
                      <span className="hidden md:flex">delete</span>
                    </button>
                  </div>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="7">
                No Standings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
