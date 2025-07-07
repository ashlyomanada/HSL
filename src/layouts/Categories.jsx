import React, { useEffect, useState } from "react";
import NextMatch from "@/assets/nextMatch.webp";
import { getCategories } from "@/services/categories";
import CategoriesLoader from "@/components/user/loader/CategoriesLoader";
import Header from "@/components/user/Header";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
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
    <div className="flex flex-col items-center justify-center gap-10 px-5 xl:px-20 py-10 ">
      <Header header={"Sports Category"} subHeader={"Leagues"} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {!loading ? (
          categories.map((category) => (
            <Card key={category.id} category={category} />
          ))
        ) : (
          <>
            <CategoriesLoader />
            <CategoriesLoader />
            <CategoriesLoader />
            <CategoriesLoader />
          </>
        )}
      </div>
    </div>
  );
};

const Card = ({ category }) => {
  const url = import.meta.env.VITE_STORAGE_URL;

  return (
    <div className="flex gap-5 border border-gray-300 p-5 rounded-xl shadow-xl">
      <img
        src={`${url}/${category.image_url}`}
        className="h-20 w-20 object-cover rounded-full"
        alt=""
      />
      <div className="flex flex-col gap-3 justify-center">
        <h1 className="font-bold text-xl xl:text-2xl text-gray-800">
          {category.category}
        </h1>
        {/* <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
          enim.
        </p> */}
      </div>
    </div>
  );
};

export default Categories;
