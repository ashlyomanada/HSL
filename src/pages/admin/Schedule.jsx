import React from "react";
import MatchCalendar from "@/components/admin/MatchCalendar";
import AdminSection from "@/components/admin/AdminSection";
import ScheduleTable from "@/components/admin/tables/ScheduleTable";
import SubHeader from "@/components/admin/SubHeader";

const Schedule = () => {
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl font-bold">Schedule</h2>
      </SubHeader>

      <MatchCalendar />
    </AdminSection>
  );
};

export default Schedule;
