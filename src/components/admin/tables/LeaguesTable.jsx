import React from "react";
import { format } from "date-fns";
import Loader from "../loader/Loader";

const LeaguesTable = ({ leagues, loading, handleEdit, handleDelete }) => {
  return (
    <div className="overflow-x-auto bg-white text-black rounded-lg shadow-xl flex flex-col">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-black">
            <th>Name</th>
            <th className="text-center">Season</th>
            <th className="text-center">Category</th>
            <th className="text-center">Start Date</th>
            <th className="text-center">End Date</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <Loader />
              </td>
            </tr>
          ) : leagues?.length > 0 ? (
            leagues.map((league) => (
              <tr key={league.id}>
                <td>{league.name}</td>
                <td className="text-center">{league.season}</td>
                <td className="text-center">{league.category.category}</td>
                <td className="text-center">
                  {format(
                    new Date(league.start_date),
                    "MMM d, yyyy, h:mm:ss a"
                  )}
                </td>
                <td className="text-center">
                  {format(new Date(league.end_date), "MMM d, yyyy, h:mm:ss a")}
                </td>
                <td className="flex gap-3 justify-center items-center">
                  <div className="flex gap-3 items-center justify-center">
                    <button
                      className="btn btn-warning btn-small"
                      onClick={() => handleEdit(league)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hidden md:flex"> edit</span>
                    </button>
                    <button
                      className="btn btn-error btn-small"
                      onClick={() => handleDelete(league.id)}
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
              <td colSpan="6" className="text-center">
                No Leagues Yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaguesTable;
