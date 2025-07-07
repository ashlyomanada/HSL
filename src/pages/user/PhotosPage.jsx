import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import { useCategoryContext } from "@/context/CategoryProvider";
import { getPhotos, getPhotosCategory } from "@/services/photos";
const PhotosPage = () => {
  const { categories, isLoadingCategories } = useCategoryContext();
  const [photos, setPhotos] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isAllBtn, setIsAllBtn] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handlePhotoCategory = async (category_id) => {
    setSelectedBtn(category_id);
    setIsAllBtn(false);
    try {
      const response = await getPhotosCategory(category_id);
      setPhotos(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllPhoto = async () => {
    setIsAllBtn(true);
    setSelectedBtn(null);
    try {
      const response = await getPhotos();
      setPhotos(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const response = await getPhotos();
        setPhotos(response);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);
  return (
    <div className="min-h-screen flex relative items-center justify-center py-10">
      <div className="flex logo h-full w-[56%] bg-[darkBlue] absolute top-0 left-0 z-0"></div>
      <div className="flex logo2 h-full w-[56%] bg-[#eb2e4c] absolute top-0 right-0"></div>

      <div className="flex flex-col items-center  gap-5 z-20 h-full w-full text-white py-5 px-5 xl:px-20">
        <div className="flex flex-col items-center justify-center gap-10">
          <Header subHeader={"PHOTOS"} header={"LEAGUE PHOTOS"} />

          <div className="flex flex-wrap gap-3">
            {categories?.length > 0 && (
              <button
                className={`btn ${isAllBtn && "btn-primary"}`}
                onClick={() => handleAllPhoto()}
              >
                All
              </button>
            )}

            {isLoadingCategories ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : categories?.length > 0 ? (
              categories.map((categ) => (
                <button
                  key={categ.id}
                  className={`btn ${selectedBtn === categ.id && "btn-primary"}`}
                  onClick={() => handlePhotoCategory(categ.id)}
                >
                  {categ.category}
                </button>
              ))
            ) : (
              <p className="text-white">No Data Found</p>
            )}
          </div>
        </div>

        {isLoading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : photos?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {photos.map((photo) => (
              <Img
                key={photo.id}
                photo={photo}
                loadedImages={loadedImages}
                setLoadedImages={setLoadedImages}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-white text-lg py-5">No Photos found</h1>
        )}
      </div>
    </div>
  );
};

const Img = ({ photo, loadedImages, setLoadedImages }) => {
  const url = import.meta.env.VITE_STORAGE_URL;
  const isLoaded = loadedImages.includes(photo.id);

  return (
    <div className="aspect-video p-2 bg-white rounded-xl">
      {!isLoaded && <div className="skeleton h-[200px] w-full"></div>}
      <img
        className={`object-cover h-full w-full rounded-xl ${
          isLoaded ? "opacity-100" : "hidden"
        }`}
        src={`${url}${photo.image}`}
        onLoad={() => setLoadedImages((prev) => [...prev, photo.id])}
        alt=""
      />
    </div>
  );
};

export default PhotosPage;
