import AdminSection from "@/components/admin/AdminSection";
import MatchBarChart from "@/components/charts/MatchBarChart";
import MatchPieChart from "@/components/charts/MatchPieChart";
import React from "react";

const Dashboard = () => {
  return (
    <AdminSection>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="flex flex-col items-center justify-center aspect-video bg-darkBlue rounded-lg shadow-md">
          <h1 className="text-5xl text-white font-semibold">20</h1>
          <h2 className="text-2xl text-white font-semibold">Teams</h2>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center bg-darkBlue rounded-lg shadow-md">
          <h1 className="text-5xl text-white font-semibold text-center">OKC</h1>
          <h2 className="text-2xl text-white font-semibold">Top 1</h2>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center bg-darkBlue rounded-lg shadow-md">
          <h1 className="text-5xl text-white font-semibold text-center"></h1>
          <h2 className="text-2xl text-white font-semibold"></h2>
        </div>
        {/* <div className="flex aspect-video flex-col items-center justify-center bg-darkBlue rounded-lg shadow-md"></div> */}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 w-full">
        <MatchBarChart />
        <MatchPieChart />
      </div>
    </AdminSection>
  );
};

export default Dashboard;
