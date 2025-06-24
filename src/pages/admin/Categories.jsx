import AdminSection from "@/components/admin/AdminSection";
import Loader from "@/components/admin/loader/Loader";
import CategoriesModal from "@/components/admin/modals/CategoriesModal";
import SubHeader from "@/components/admin/SubHeader";
import CategoriesTable from "@/components/admin/tables/CategoriesTable";
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
  const [categoriesPerPage] = useState(5);

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

      <CategoriesModal
        ref={modalRef}
        editingId={editingId}
        setEditingId={setEditingId}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        handleFile={handleFile}
      />

      <CategoriesTable
        loading={loading}
        currentCategories={currentCategories}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </AdminSection>
  );
};

export default Categories;
