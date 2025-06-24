import React, { useEffect, useState } from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import { getCategories } from "@/services/categories";
import { Link } from "react-router-dom";
import Loader2 from "@/components/admin/loader/Loader2";
import CardCategory from "@/components/admin/cards/CardCategory";
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

      <CardCategory path={"/admin/matches"} />
    </AdminSection>
  );
};

export default Matches;
