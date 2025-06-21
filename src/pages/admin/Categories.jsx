import AdminSection from "@/components/admin/AdminSection";
import Loader from "@/components/admin/loader/Loader";
import SubHeader from "@/components/admin/SubHeader";
import {
  createCategories,
  deleteCategories,
  getCategories,
  updateCategories,
} from "@/services/categories";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ category: "", image_url: "" });
  const modalRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(4);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCategories(editingId, form);
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await createCategories(form);
        Swal.fire({
          title: "Success!",
          text: "Category created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      setEditingId(null);
      modalRef.current.close();
      setForm({ category: "" });
      const response = await getCategories();
      setCategories(response);
      setCurrentPage(1); // Reset to first page after changes
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (form) => {
    setEditingId(form.id);
    setForm({
      category: form.category,
      image_url: form.image_url,
    });
    modalRef.current.showModal();
    setPreviewUrl(`http://127.0.0.1:8000/storage/${form.image_url}`);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image_url: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteCategories(id);
        const updated = categories.filter((category) => category.id !== id);
        setCategories(updated);
        Swal.fire({
          title: "Deleted!",
          text: "The Category has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // Adjust page if last item was deleted on last page
        const totalPages = Math.ceil(updated.length / categoriesPerPage);
        if (currentPage > totalPages) setCurrentPage(totalPages);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete the Category.", "error");
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl md:text-2xl font-bold">Manage Categories</h2>
        <button className="btn" onClick={() => modalRef.current.showModal()}>
          Add Categories
        </button>
      </SubHeader>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">
            {editingId ? "Edit Category" : "Add Category"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-3"
            encType="multipart/form-data"
          >
            {(previewUrl ||
              (editingId && typeof form.image_url === "string")) && (
              <div>
                <img
                  className="h-20 object-contain"
                  src={
                    previewUrl
                      ? previewUrl
                      : `http://127.0.0.1:8000/storage/${form.image_url}`
                  }
                  alt="Logo Preview"
                />
              </div>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Choose logo</legend>
              <input type="file" className="file-input" onChange={handleFile} />
              <label className="label">Max size 2MB</label>
            </fieldset>

            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter Category name"
                className="input input-md border border-gray-300 w-full"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
              />
              <span>Category name</span>
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="btn btn-success btn-medium text-white"
              >
                Submit
              </button>
              <div
                className="btn btn-medium"
                onClick={() => {
                  setEditingId(null);
                  setForm({ category: "" });
                  setPreviewUrl(null);
                  modalRef.current.close();
                }}
              >
                Close
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl flex flex-col">
        <table className="table">
          <thead>
            <tr>
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
                      <img
                        src={`http://127.0.0.1:8000/storage/${category.image_url}`}
                        alt="logo"
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
    </AdminSection>
  );
};

export default Categories;
