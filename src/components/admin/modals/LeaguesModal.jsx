import React, { forwardRef } from "react";

const LeaguesModal = forwardRef(
  (
    { editingId, handleSubmit, form, setForm, categories, handleCloseModal },
    modalRef
  ) => {
    return (
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
            <label className="select border border-gray-300 w-full">
              <span className="label">Sports</span>
              <select
                className="input input-md border border-gray-300 w-full"
                value={form.category_id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category_id: e.target.value }))
                }
                required
              >
                <option value="">-- Choose Sport --</option>
                {categories?.length > 0 &&
                  categories.map((categ) => (
                    <option key={categ.id} value={categ.id}>
                      {categ.category}
                    </option>
                  ))}
              </select>
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
              <div className="btn btn-medium" onClick={handleCloseModal}>
                Close
              </div>
            </div>
          </form>
        </div>
      </dialog>
    );
  }
);

export default LeaguesModal;
