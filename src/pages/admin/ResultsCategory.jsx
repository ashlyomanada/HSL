import React from "react";
import AdminSection from "@/components/admin/AdminSection";
import SubHeader from "@/components/admin/SubHeader";
import CardCategory from "@/components/admin/cards/CardCategory";
const ResultsCategory = () => {
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl md:text-2xl font-bold">Results Categories</h2>
      </SubHeader>

      <CardCategory path={"/admin/results"} />
    </AdminSection>
  );
};

export default ResultsCategory;
