import React from "react";
import Navbar from "../../components/admin/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import Teams from "./Teams";
import ResultsCategory from "./ResultsCategory";
import Results from "@/layouts/Results";
import Standings from "./Standings";
import { useToggle } from "@/context/ToggleProvider";
import Schools from "./Schools";
import Leagues from "./Leagues";
import Matches from "./Matches";
import MatchDetails from "@/layouts/MatchDetails";
import Categories from "./Categories";

const AdminPage = () => {
  const { toggle } = useToggle();
  return (
    <div className="flex min-h-screen justify-end">
      <Navbar />
      <main
        className={`${
          toggle ? "lg:w-[80%]" : "lg:w-[93%]"
        } min-h-screen w-full bg-gray-100 shadow-md border border-gray-200 pt-14 transition-all ease-in-out duration-300`}
      >
        <section className="h-full w-full bg-gray-100 border-2 border-gray-200">
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/matches" element={<Matches />} />
            <Route path="/admin/schedule" element={<Schedule />} />
            <Route path="/admin/schools" element={<Schools />} />
            <Route path="/admin/teams" element={<Teams />} />
            <Route path="/admin/results" element={<ResultsCategory />} />
            <Route path="/admin/results/:id/:name" element={<Results />} />
            <Route path="/admin/standings" element={<Standings />} />
            <Route path="/admin/leagues" element={<Leagues />} />
            <Route path="/admin/matches/:id/:name" element={<MatchDetails />} />
            <Route path="/admin/categories" element={<Categories />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
