import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import { getMatches, getMatchesCategory } from "@/services/matches";
import { getCategories } from "@/services/categories";
import ScheduleCard from "@/components/user/cards/ScheduleCard";
import CardLoader from "@/components/user/loader/CardLoader";
import { useLocation } from "react-router-dom";
const SchedulesPage = () => {
  const [matches, setMatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCateg, setSelectedCateg] = useState(null);
  const [loaded, setLoaded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [all, setAll] = useState(false);
  const location = useLocation();

  const handleFilter = async (category) => {
    if (category) {
      setSelectedCateg(category.category);
      setLoading(true);
      try {
        const response = await getMatchesCategory({
          category_id: parseInt(category.id),
          status: "Not Started",
        });
        setMatches(response);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setSelectedCateg(null);
      try {
        const matchResponse = await getMatches();
        const categResponse = await getCategories();
        const notStarted = matchResponse.filter(
          (res) => res.status === "Not Started"
        );

        setMatches(notStarted);
        setCategories(categResponse);
      } catch (error) {
        console.error(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [all]);
  return (
    <div
      className={`min-h-[50vh] flex flex-col gap-10 pt-10 pb-20 px-5 xl:px-20 ${
        location.pathname !== "/" ? "pt-28 min-h-screen" : "pt-0"
      }`}
    >
      <div className="flex flex-col gap-3">
        <Header subHeader={"GAME SCHEDULE"} header={"GAME SCHEDULE"} />
        <div className="flex flex-col w-full gap-5 items-center">
          <div className="flex flex-wrap gap-3 justify-center">
            {!loading && (
              <button
                className={`btn ${selectedCateg ? "" : "btn-primary"}`}
                onClick={() => setAll(!all)}
              >
                All
              </button>
            )}
            {!loading ? (
              categories?.length > 0 ? (
                categories.map((categ) => (
                  <button
                    onClick={() => handleFilter(categ)}
                    className={`flex-none ${
                      selectedCateg === categ.category
                        ? "btn btn-primary"
                        : "btn "
                    }`}
                    key={categ.id}
                  >
                    {categ.category}
                  </button>
                ))
              ) : (
                <p className="text-center font-semibold text-xl">
                  No Categories found
                </p>
              )
            ) : (
              <span className="loading loading-spinner text-pink-600"></span>
            )}
          </div>
        </div>
      </div>

      {!loading ? (
        matches?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matches.map((match) => (
              <ScheduleCard
                key={match.id}
                match={match}
                loaded={loaded}
                setLoaded={setLoaded}
                loading={loading}
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-semibold text-xl">No Schedules yet</p>
        )
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
      )}
    </div>
  );
};

export default SchedulesPage;
