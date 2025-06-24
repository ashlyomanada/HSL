import React from "react";

const CardPhotos = ({
  photo,
  loadedImages,
  setLoadedImages,
  url,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg justify-between">
      {!loadedImages.includes(photo.id) && (
        <div className="h-48 w-full bg-gray-300 animate-pulse rounded-t-lg" />
      )}

      <img
        className={`rounded-t-lg transition-opacity duration-300 ${
          loadedImages.includes(photo.id) ? "opacity-100" : "opacity-0 absolute"
        }`}
        src={`${url}/${photo.image}`}
        alt=""
        onLoad={() => setLoadedImages((prev) => [...prev, photo.id])}
      />

      <div className="flex justify-between items-center p-5">
        <div className="flex flex-col text-start">
          <h1 className="font-semibold text-lg">{photo.name}</h1>
          <p className="text-sm text-gray-600">{photo.description}</p>
        </div>

        <div className="flex gap-3">
          <button className="text-xl" onClick={() => handleEdit(photo)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="text-xl" onClick={() => handleDelete(photo.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPhotos;
