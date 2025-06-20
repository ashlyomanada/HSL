import React, { useEffect, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import { getCategories } from "@/services/categories";
import { Link } from "react-router-dom";
const ResultsCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">Manage Matches</h2>
      </SubHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.length > 0 &&
          categories.map((categ) => (
            <Link
              to={`/admin/results/${categ.id}/${categ.category}`}
              className="aspect-video bg-darkBlue rounded-lg text-white flex  gap-5 items-center px-5"
              key={categ.id}
            >
              <img
                className="h-20 w-20 rounded-full"
                src={`http://127.0.0.1:8000/storage/${categ.image_url}`}
                alt=""
              />

              <h1 className="text-2xl font-semibold">{categ.category}</h1>
            </Link>
          ))}
      </div>
    </AdminSection>
  );
};

export default ResultsCategory;
