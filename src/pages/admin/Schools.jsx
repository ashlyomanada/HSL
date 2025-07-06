import React, { useEffect, useRef, useState } from "react";
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
import SchoolModal from "@/components/admin/modals/SchoolModal";

const Schools = () => {
  const baseUrl = import.meta.env.VITE_STORAGE_URL;
  const [schools, setSchools] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", logo_url: "" });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const schoolModalRef = useRef();
  const [loadedImages, setLoadedImages] = useState([]);

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

      schoolModalRef.current.close();
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
    schoolModalRef.current.showModal();
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
        <h2 className="text-xl md:text-2xl font-bold">Manage Schools</h2>
        <button
          className="btn"
          onClick={() => schoolModalRef.current.showModal()}
        >
          Add School
        </button>
      </SubHeader>

      <SchoolModal
        ref={schoolModalRef}
        editingId={editingId}
        setEditingId={setEditingId}
        form={form}
        setForm={setForm}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        baseUrl={baseUrl}
        handleFile={handleFile}
        handleSubmit={handleSubmit}
      />

      <SchoolsTable
        schools={schools}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
        loadedImages={loadedImages}
        setLoadedImages={setLoadedImages}
      />
    </AdminSection>
  );
};

export default Schools;
