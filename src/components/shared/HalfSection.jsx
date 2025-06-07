import React from "react";

const HalfSection = ({ children }) => {
  return (
    <section className="flex flex-col gap-10 justify-center min-h-[50vh] items-center py-10 text-white bg-[#23284c]">
      {children}
    </section>
  );
};

export default HalfSection;
