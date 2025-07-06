import React from "react";
import Loader from "../loader/Loader";
import TableImgLoader from "../loader/TableImgLoader";

const TeamsTable = ({
  teams,
  handleEdit,
  handleDelete,
  loading,
  loadedImages,
  setLoadedImages,
}) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl text-black">
      <table className="table">
        <thead>
          <tr className="text-black">
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
                <Loader />
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
                          {!loadedImages.includes(team.id) && (
                            <TableImgLoader />
                          )}
                          <img
                            className={`transition-opacity duration-500 ease-in-out ${
                              loadedImages.includes(team.id)
                                ? "opacity-100"
                                : "opacity-0 absolute"
                            }`}
                            src={`${url}/${team.school.logo_url}`}
                            alt={`${team.school.name} Logo`}
                            onLoad={() =>
                              setLoadedImages((prev) => [...prev, team.id])
                            }
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
                <td className="text-center">{team.category.category}</td>
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
                No Teams found for selected category
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTable;
