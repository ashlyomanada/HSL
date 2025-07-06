import React, { forwardRef } from "react";

const SchoolModal = forwardRef(
  (
    {
      editingId,
      setEditingId,
      form,
      setForm,
      previewUrl,
      setPreviewUrl,
      baseUrl,
      handleFile,
      handleSubmit,
    },
    schoolModalRef
  ) => {
    return (
      <dialog
        ref={schoolModalRef}
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
              <input type="file" className="file-input w-full" onChange={handleFile} />
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
                  schoolModalRef.current?.close();
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
    );
  }
);

export default SchoolModal;
