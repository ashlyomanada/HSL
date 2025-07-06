import React, { forwardRef } from "react";

const PhotosModal = forwardRef(
  (
    {
      form,
      setForm,
      handleSubmit,
      handleFile,
      previewUrl,
      editingId,
      handleCloseModal,
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
            {(previewUrl || (editingId && typeof form.image === "string")) && (
              <div>
                <img
                  className="h-20 object-contain"
                  src={
                    previewUrl
                      ? previewUrl
                      : `http://127.0.0.1:8000/storage/${form.image}`
                  }
                  alt="Logo Preview"
                />
              </div>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Choose Photo</legend>
              <input type="file" className="file-input w-full" onChange={handleFile} />
              <label className="label">Max size 2MB</label>
            </fieldset>

            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter Name"
                className="input input-md border border-gray-300 w-full"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <span>Name</span>
            </label>

            <label className="floating-label">
              <input
                type="text"
                placeholder="Enter Description"
                className="input input-md border border-gray-300 w-full"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
              />
              <span>Description</span>
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
                onClick={() => handleCloseModal()}
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

export default PhotosModal;
