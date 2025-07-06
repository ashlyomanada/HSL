import React from "react";

const CategoriesLoader = () => {
  return (
    <div className="flex gap-5">
      <div className="skeleton h-20 w-20 object-cover rounded-full"></div>
      <div className="flex flex-col gap-3 justify-center">
        <div className="skeleton h-10 w-40"></div>
        {/* <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
              enim.
            </p> */}
      </div>
    </div>
  );
};

export default CategoriesLoader;
