import AdminSection from "@/components/admin/AdminSection";
import CardPhotos from "@/components/admin/cards/CardPhotos";
import Empty from "@/components/admin/Empty";
import Loader2 from "@/components/admin/loader/Loader2";
import PhotosModal from "@/components/admin/modals/PhotosModal";
import SubHeader from "@/components/admin/SubHeader";
import {
  createPhotos,
  deletePhoto,
  getPhotosCategory,
  updatePhotos,
} from "@/services/photos";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PhotosDetails = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const url = import.meta.env.VITE_STORAGE_URL;
  const modalRef = useRef();
  const [form, setForm] = useState({
    category_id: id,
    name: "",
    description: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePhotos(editingId, form);
        Swal.fire({
          title: "Success!",
          text: "Photo updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await createPhotos(form);
        Swal.fire({
          title: "Success!",
          text: "Photo Created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setForm({ category_id: id, name: "", description: "", image: "" });
      modalRef.current.close();
      const response = await getPhotosCategory(id);
      setPhotos(response);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEdit = (form) => {
    modalRef.current.showModal();
    setEditingId(form.id);
    setForm({
      category_id: id,
      name: form.name,
      description: form.description,
      image: form.image,
    });
    setPreviewUrl(`${url}/${form.image}`);
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
        await deletePhoto(id);
        setPhotos((prev) => prev.filter((photo) => photo.id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "The photo has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete the photo.", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setForm({
      category_id: id,
      name: "",
      description: "",
      image: "",
    });
    setPreviewUrl(null);
    setEditingId(null);
    modalRef.current?.close();
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await getPhotosCategory(id);
        setPhotos(response);
      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [id]);

  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">{name || "Sports"} Match Photos</h2>
        <div className="flex items-center gap-3">
          <button className="btn" onClick={() => modalRef.current.showModal()}>
            Add Photos
          </button>
          <button className="btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </SubHeader>

      <PhotosModal
        ref={modalRef}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        handleFile={handleFile}
        previewUrl={previewUrl}
        editingId={editingId}
        handleCloseModal={handleCloseModal}
      />

      {loading ? (
        <Loader2 />
      ) : photos?.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          {photos.map((photo) => (
            <CardPhotos
              key={photo.id}
              photo={photo}
              loadedImages={loadedImages}
              setLoadedImages={setLoadedImages}
              url={url}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <Empty message={"No Photos yet for"} categoryName={name} />
      )}
    </AdminSection>
  );
};

export default PhotosDetails;
