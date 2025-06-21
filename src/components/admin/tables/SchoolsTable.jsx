import React from "react";
import Loader from "../loader/Loader";

const SchoolsTable = ({ schools, handleEdit, handleDelete, loading }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>School Name</th>
            <th className="text-center">School Address</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-5">
                <Loader />
              </td>
            </tr>
          ) : schools?.length > 0 ? (
            schools.map((school) => (
              <tr key={school.id}>
                <td>
                  <div className="flex justify-start items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={`http://127.0.0.1:8000/storage/${school.logo_url}`}
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{school.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">{school.address}</td>
                <td>
                  <div className="flex gap-3 items-center justify-center">
                    <button
                      className="btn btn-warning btn-small"
                      onClick={() => handleEdit(school)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hidden md:flex"> edit</span>
                    </button>
                    <button
                      className="btn btn-error btn-small"
                      onClick={() => handleDelete(school.id)}
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
              <td colSpan={`3`} className="text-center">
                No Schools found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolsTable;
