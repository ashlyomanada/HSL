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
import { getCategories } from "@/services/categories";
import LeaguesModal from "@/components/admin/modals/LeaguesModal";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    season: "",
    category_id: "",
    start_date: "",
    end_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const modalRef = useRef(null);

  const fetchLeagues = async () => {
    setLoading(true);
    try {
      const response = await getLeagues();
      const categRes = await getCategories();
      setLeagues(response);
      setCategories(categRes);
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
        category_id: "",
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
      category_id: form.category.id,
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

  const handleCloseModal = () => {
    setEditingId(null);
    setForm({
      name: "",
      season: "",
      category_id: "",
      start_date: "",
      end_date: "",
    });
    modalRef.current.close();
  };

  useEffect(() => {
    fetchLeagues();
  }, []);
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl md:text-2xl font-bold">Leagues</h2>
        <button className="btn" onClick={() => modalRef.current.showModal()}>
          Add Leagues
        </button>
      </SubHeader>

      <LeaguesModal
        ref={modalRef}
        editingId={editingId}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        categories={categories}
        handleCloseModal={handleCloseModal}
      />

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
