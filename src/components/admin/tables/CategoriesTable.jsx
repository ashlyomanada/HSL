import React from "react";
import Loader from "../loader/Loader";
import TableImgLoader from "../loader/TableImgLoader";

const CategoriesTable = ({
  loading,
  currentCategories,
  handleEdit,
  handleDelete,
  totalPages,
  currentPage,
  setCurrentPage,
  loadedImages,
  setLoadedImages,
}) => {
  return (
    <div className="overflow-x-auto bg-white text-black rounded-lg shadow-xl flex flex-col">
      <table className="table">
        <thead>
          <tr className="text-black">
            <th className="text-center">Image</th>
            <th className="text-center">Category Name</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center">
                <Loader />
              </td>
            </tr>
          ) : currentCategories.length > 0 ? (
            currentCategories.map((category) => (
              <tr key={category.id}>
                <td className="flex items-center justify-center">
                  <div className="mask mask-squircle h-12 w-12">
                    {!loadedImages.includes(category.id) && <TableImgLoader />}
                    <img
                      src={`http://127.0.0.1:8000/storage/${category.image_url}`}
                      className={`transition-opacity ease-in-out duration-500${
                        loadedImages.includes(category.id)
                          ? "opacity-100"
                          : "opacity-0 absolute"
                      }`}
                      alt="logo"
                      onLoad={() =>
                        setLoadedImages((prev) => [...prev, category.id])
                      }
                    />
                  </div>
                </td>
                <td className="text-center">{category.category}</td>
                <td>
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="btn btn-warning btn-small"
                      onClick={() => handleEdit(category)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="hidden md:flex"> edit</span>
                    </button>
                    <button
                      className="btn btn-error btn-small"
                      onClick={() => handleDelete(category.id)}
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
              <td colSpan="3" className="text-center text-gray-500">
                No categories available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 p-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
