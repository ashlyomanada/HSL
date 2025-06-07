import React, { useEffect, useRef, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import LeaguesTable from "@/components/admin/tables/LeaguesTable";
import {
  createLeagues,
  deleteLeagues,
  getLeagues,
  updateLeagues,
} from "@/services/league";
import Swal from "sweetalert2";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    season: "",
    category: "",
    start_date: "",
    end_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const modalRef = useRef(null);

  const fetchLeagues = async () => {
    setLoading(true);
    try {
      const response = await getLeagues();
      setLeagues(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateLeagues(editingId, form);
        Swal.fire({
          title: "Success!",
          text: "League updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await createLeagues(form);
        Swal.fire({
          title: "Success!",
          text: "League created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }

      modalRef.current.close();
      await fetchLeagues();
      setEditingId(null);
      setForm({
        name: "",
        season: "",
        category: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (form) => {
    setEditingId(form.id);
    modalRef.current.showModal();
    setForm({
      name: form.name,
      season: form.season,
      category: form.category,
      start_date: form.start_date,
      end_date: form.end_date,
    });
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

    try {
      if (result.isConfirmed) {
        await deleteLeagues(id);
        setLeagues((prev) => prev.filter((league) => league.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The League has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to delete the League.", "error");
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">Leagues</h2>
        <button className="btn" onClick={() => modalRef.current.showModal()}>
          Add Leagues
        </button>
      </SubHeader>

      <dialog
        id="leagues_modal"
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">
            {editingId ? "Edit School" : "Add School"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-3"
            encType="multipart/form-data"
          >
            {/* League Name Input */}
            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter League name"
                className="input input-md border border-gray-300 w-full"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <span>League name</span>
            </label>

            {/* Season Input */}
            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter Season name"
                className="input input-md border border-gray-300 w-full"
                value={form.season}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, season: e.target.value }))
                }
              />
              <span>Season name</span>
            </label>

            {/* Category Input */}
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

            {/* Start Date Input */}
            <label className="input border border-gray-300 w-full">
              <span className="label">Start date</span>
              <input
                type="datetime-local"
                value={form.start_date}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, start_date: e.target.value }))
                }
              />
            </label>

            {/* End Date Input */}
            <label className="input border border-gray-300 w-full">
              <span className="label">End date</span>
              <input
                type="datetime-local"
                value={form.end_date}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, end_date: e.target.value }))
                }
              />
            </label>

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
                  modalRef.current.close();
                }}
              >
                Close
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <LeaguesTable
        leagues={leagues}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </AdminSection>
  );
};

export default Leagues;
