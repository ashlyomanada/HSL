import React, { forwardRef } from "react";

const TeamsModal = forwardRef(
  (
    {
      editingId,
      handleSubmit,
      form,
      setForm,
      category,
      handleModalClose,
      schools,
    },
    modalRef
  ) => {
    return (
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
    );
  }
);

export default TeamsModal;
