import AdminSection from "@/components/admin/AdminSection";
import MatchCalendar from "@/components/admin/MatchCalendar";
import UpcomingMatches from "@/components/admin/UpcomingMatches";
import MatchBarChart from "@/components/charts/MatchBarChart";
import MatchPieChart from "@/components/charts/MatchPieChart";
import React from "react";

const Dashboard = () => {
  return (
    <AdminSection>
      <MatchBarChart />

      <div className="grid lg:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-2 bg-white p-3 rounded-xl">
          <h2 className="text-xl md:text-2xl font-bold">Schedule</h2>
          <MatchCalendar />
        </div>
        {/* <MatchBarChart /> */}
        <UpcomingMatches />
      </div>
    </AdminSection>
  );
};

export default Dashboard;
