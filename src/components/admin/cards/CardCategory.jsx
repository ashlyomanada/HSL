import React, { useEffect, useState } from "react";
import Loader2 from "../loader/Loader2";
import { getCategories } from "@/services/categories";
import { Link } from "react-router-dom";

const CardCategory = ({ path }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories?.length > 0 &&
            categories.map((categ) => (
              <Link
                to={`${path}/${categ.id}/${categ.category}`}
                className="aspect-video bg-[darkBlue] rounded-lg text-white flex flex-col justify-center  gap-5 items-center px-5"
                key={categ.id}
              >
                {!loadedImages.includes(categ.id) && (
                  <div className="h-20 w-20 bg-gray-300 animate-pulse rounded-full" />
                )}
                <img
                  className={`h-20 w-20 rounded-full ${
                    loadedImages.includes(categ.id)
                      ? "opacity-100"
                      : "opacity-0 absolute"
                  }`}
                  src={`http://127.0.0.1:8000/storage/${categ.image_url}`}
                  alt=""
                  onLoad={() => setLoadedImages((prev) => [...prev, categ.id])}
                />

                <h1 className="text-2xl font-semibold">{categ.category}</h1>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default CardCategory;
