import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import StandingsTable from "@/components/admin/tables/StandingsTable";
import { getCategories } from "@/services/categories";
import { getStandings, getStandingsCategory } from "@/services/standings";
import React, { useEffect, useState } from "react";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [loadedImages, setLoadedImages] = useState([]);

  const handleCategory = async (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategoryId(selectedCategory);
    setLoading(true);

    try {
      const response = await getStandingsCategory({
        category: selectedCategory,
      });
      setStandings(response);
    } catch (error) {
      console.error(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categResp = await getCategories();
        const response = await getStandingsCategory({
          category: selectedCategoryId,
        });
        setCategory(categResp);
        setStandings(response);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl md:text-2xl font-bold">Team Standings</h2>

        <div className="flex">
          <select
            className="select border border-gray-300"
            value={selectedCategoryId}
            onChange={handleCategory}
            required
          >
            <option value="">-- Choose Category --</option>
            {category?.length > 0 &&
              category.map((categ) => (
                <option key={categ.id} value={categ.id}>
                  {categ.category}
                </option>
              ))}
          </select>
        </div>
      </SubHeader>

      <StandingsTable
        standings={standings}
        loading={loading}
        loadedImages={loadedImages}
        setLoadedImages={setLoadedImages}
      />
    </AdminSection>
  );
};

export default Standings;
