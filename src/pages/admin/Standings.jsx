import AdminSection from "@/components/admin/AdminSection";
import StandingsTable from "@/components/admin/tables/StandingsTable";
import { getStandings, getStandingsCategory } from "@/services/standings";
import React, { useEffect, useState } from "react";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Basketball");

  const handleCategory = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
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
        const response = await getStandingsCategory(
          { category: category } || []
        );
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
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Team Standings</h2>

        <div className="flex">
          <select
            className="select border border-gray-300"
            onChange={handleCategory}
          >
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Badminton">Badminton</option>
          </select>
        </div>
      </div>

      <StandingsTable standings={standings} loading={loading} />
    </AdminSection>
  );
};

export default Standings;
