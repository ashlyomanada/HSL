import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import TeamsTable from "@/components/admin/tables/TeamsTable";
import { getCategories } from "@/services/categories";
import { getSchools } from "@/services/schools";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  getCategoryType,
} from "@/services/team";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Teams = () => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    school_id: "",
    name: "",
    category_id: "",
  });
  const [schools, setSchools] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const [categoryType, setCategoryType] = useState(null);
  const [category, setCategory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTeam(editingId, form);
        Swal.fire({
          title: "Success!",
          text: "Team updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await createTeam(form);
        Swal.fire({
          title: "Success!",
          text: "Team created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setEditingId(null);
      modalRef.current.close();
      setForm({ school_id: "", name: "", category_id: "" });

      if (categoryType) {
        const response = await getCategoryType({ category_id: categoryType });
        setTeams(response);
      } else {
        const response = await getTeams();
        setTeams(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (team) => {
    modalRef.current.showModal();
    setForm({
      school_id: team.school_id,
      name: team.name,
      category_id: team.category_id,
    });
    setEditingId(team.id);
  };

  const handleModalClose = () => {
    setEditingId(null);
    setForm({ school_id: "", name: "", category_id: "" });
    modalRef.current.close();
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
        await deleteTeam(id);
        setTeams((prev) => prev.filter((team) => team.id !== id));

        // Show success notification
        Swal.fire({
          title: "Deleted!",
          text: "The team has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete the team.", "error");
      }
    }
  };

  const handleCategory = async (e) => {
    const selectedCategory = e.target.value;
    setCategoryType(e.target.value);
    setLoading(true);
    try {
      const response = await getCategoryType({ category_id: selectedCategory });
      setTeams(response);
    } catch (error) {
      console.error(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await getSchools();
      setSchools(response);
    };

    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await getTeams();
        setTeams(response);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await getCategories();
        setCategory(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
    fetchSchools();
    fetchTeams();
  }, []);
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold mb-4">Manage Teams</h2>
        <div className="flex items-center gap-5">
          <select
            className="select border border-gray-300"
            onChange={handleCategory}
            required
          >
            <option value="">-- Choose Sport --</option>
            {category?.length > 0 &&
              category.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.category}
                </option>
              ))}
          </select>
          <button className="btn" onClick={() => modalRef.current.showModal()}>
            Add Team
          </button>
        </div>
      </SubHeader>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">
            {editingId ? "Edit Team" : "Add Team"}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-stretch gap-4"
            encType="multipart/form-data"
          >
            {/* Team Name Input */}
            <label className="form-control w-full">
              <span className="label-text mb-1">Team Name</span>
              <input
                type="text"
                placeholder="Enter team name"
                className="input input-bordered w-full"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </label>

            {/* Select School */}
            <label className="form-control w-full">
              <span className="label-text mb-1">Select School</span>
              <select
                className="select select-bordered w-full"
                value={form.school_id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, school_id: e.target.value }))
                }
                required
              >
                <option value="">-- Choose School --</option>
                {schools?.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Select Sport Category */}
            <label className="form-control w-full">
              <span className="label-text mb-1">Select Sport</span>
              <select
                className="select select-bordered w-full"
                value={form.category_id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category_id: e.target.value }))
                }
                required
              >
                <option value="">-- Choose Sport --</option>
                {category?.length > 0 &&
                  category.map((categ) => (
                    <option key={categ.id} value={categ.id}>
                      {categ.category}
                    </option>
                  ))}
              </select>
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button type="submit" className="btn btn-success text-white">
                {editingId ? "Update" : "Submit"}
              </button>
              <button type="button" className="btn" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <TeamsTable
        teams={teams}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </AdminSection>
  );
};

export default Teams;
