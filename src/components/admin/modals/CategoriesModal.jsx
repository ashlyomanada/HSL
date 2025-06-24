import React, { forwardRef } from "react";

const CategoriesModal = forwardRef(
  (
    {
      editingId,
      setEditingId,
      handleSubmit,
      form,
      setForm,
      previewUrl,
      setPreviewUrl,
      handleFile,
    },
    modalRef
  ) => {
    return (
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
    );
  }
);

export default CategoriesModal;
