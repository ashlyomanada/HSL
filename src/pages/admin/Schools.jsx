import React, { useEffect, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import {
  createSchool,
  deleteSchool,
  editSchool,
  getSchools,
} from "@/services/schools";
import SchoolsTable from "@/components/admin/tables/SchoolsTable";
import SubHeader from "@/components/admin/SubHeader";
import Swal from "sweetalert2";

const Schools = () => {
  const baseUrl = import.meta.env.VITE_STORAGE_URL;
  const [schools, setSchools] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", logo_url: "" });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, logo_url: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await editSchool(editingId, form);
        Swal.fire({
          title: "Success!",
          text: "School updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await createSchool(form);
        Swal.fire({
          title: "Success!",
          text: "School created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      document.getElementById("my_modal_5").close();
      setEditingId(null);
      setForm({ name: "", address: "", logo_url: "" });
      setPreviewUrl(null);

      const response = await getSchools();
      setSchools(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (school) => {
    document.getElementById("my_modal_5").showModal();
    setEditingId(school.id);
    setForm({
      name: school.name,
      address: school.address,
      logo_url: school.logo_url,
    });
    setPreviewUrl(`${baseUrl}/${school.logo_url}`);
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
        await deleteSchool(id);
        setSchools((prev) => prev.filter((school) => school.id !== id));

        // Show success notification
        Swal.fire({
          title: "Deleted!",
          text: "The School has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete the School.", "error");
      }
    }
  };

  useEffect(() => {
    const fetchSchoolsData = async () => {
      setLoading(true);
      try {
        const response = await getSchools();
        setSchools(response);
      } catch (error) {
        console.error("Error Fetching data:", error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolsData();
  }, []);

  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">Manage Schools</h2>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add School
        </button>
      </SubHeader>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">
            {editingId ? "Edit School" : "Add School"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-3"
            encType="multipart/form-data"
          >
            {/* Name Input */}
            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter School name"
                className="input input-md border border-gray-300 w-full"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <span>School name</span>
            </label>

            {/* Address Input */}
            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter School Address"
                className="input input-md border border-gray-300 w-full"
                value={form.address}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, address: e.target.value }))
                }
              />
              <span>School Address</span>
            </label>

            {/* Image Preview */}
            {(previewUrl ||
              (editingId && typeof form.logo_url === "string")) && (
              <div>
                <img
                  className="h-20 object-contain"
                  src={previewUrl ? previewUrl : `${baseUrl}/${form.logo_url}`}
                  alt="Logo Preview"
                />
              </div>
            )}

            {/* File Upload */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Choose logo</legend>
              <input type="file" className="file-input" onChange={handleFile} />
              <label className="label">Max size 2MB</label>
            </fieldset>

            {/* Buttons */}
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
                  document.getElementById("my_modal_5").close();
                  setEditingId(null);
                  setForm({ name: "", address: "", logo_url: "" });
                  setPreviewUrl(null);
                }}
              >
                Close
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <SchoolsTable
        schools={schools}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </AdminSection>
  );
};

export default Schools;
