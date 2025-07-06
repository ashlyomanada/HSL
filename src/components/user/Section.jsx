import React from "react";

const Section = ({
  children,
  background = "bg-transparent",
  location = null,
}) => {
  return (
    <section
      className={`${background} lg:min-h-screen py-10 px-5 xl:px-20 flex flex-col justify-center gap-10 items-center w-full`}
    >
      {children}
    </section>
  );
};

export default Section;
