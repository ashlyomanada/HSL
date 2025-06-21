import React, { useEffect, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import { getCategories } from "@/services/categories";
import { Link } from "react-router-dom";
import Loader2 from "@/components/admin/loader/Loader2";
const Matches = () => {
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
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl md:text-2xl font-bold">Manage Matches</h2>
      </SubHeader>

      {loading ? (
        <Loader2 />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories?.length > 0 &&
            categories.map((categ) => (
              <Link
                to={`/admin/matches/${categ.id}/${categ.category}`}
                className="aspect-video bg-darkBlue rounded-lg text-white flex  gap-5 items-center px-5"
                key={categ.id}
              >
                <img
                  className="h-20 w-20 rounded-full"
                  src={`http://127.0.0.1:8000/storage/${categ.image_url}`}
                  alt=""
                  loading="lazy"
                />

                <h1 className="text-2xl font-semibold">{categ.category}</h1>
              </Link>
            ))}
        </div>
      )}
    </AdminSection>
  );
};

export default Matches;
