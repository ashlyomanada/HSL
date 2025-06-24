import AdminSection from "@/components/admin/AdminSection";
import CardCategory from "@/components/admin/cards/CardCategory";
import SubHeader from "@/components/admin/SubHeader";
import React from "react";

const Photos = () => {
  return (
    <AdminSection>
      <SubHeader>
        <h2 className="text-xl md:text-2xl font-bold">Manage Photos</h2>
      </SubHeader>

      <CardCategory path={"/admin/photos"} />
    </AdminSection>
  );
};

export default Photos;
