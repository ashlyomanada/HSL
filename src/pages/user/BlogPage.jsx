import React from "react";
import Header from "@/components/user/Header";
import postImg from "@/assets/nextMatch.webp";
import { useLocation } from "react-router-dom";
const BlogPage = () => {
  const location = useLocation();
  return (
    <div
      className={`flex flex-col gap-10 md:gap-15 py-10 px-5 xl:px-20 ${
        location.pathname === "/blogs" && "pt-28 pb-10"
      }`}
    >
      <Header subHeader={"BLOG"} header={"RECENT NEWS"} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex relative">
            <img src={postImg} alt="" className="aspect-square object-cover" />
            <div className="flex absolute bottom-0 left-0 bg-white p-3 gap-2">
              <h3 className="text-5xl">29</h3>
              <div className="flex flex-col">
                <h2>2019</h2>
                <h1>May</h1>
              </div>
            </div>
          </div>
          <h1 className="font-bold">
            Why Lead Generation is Key for Business Growth
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex relative">
            <img src={postImg} alt="" className="aspect-square object-cover" />
            <div className="flex absolute bottom-0 left-0 bg-white p-3 gap-2">
              <h3 className="text-5xl">29</h3>
              <div className="flex flex-col">
                <h2>2019</h2>
                <h1>May</h1>
              </div>
            </div>
          </div>
          <h1 className="font-bold">
            Why Lead Generation is Key for Business Growth
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex relative">
            <img src={postImg} alt="" className="aspect-square object-cover" />
            <div className="flex absolute bottom-0 left-0 bg-white p-3 gap-2">
              <h3 className="text-5xl">29</h3>
              <div className="flex flex-col">
                <h2>2019</h2>
                <h1>May</h1>
              </div>
            </div>
          </div>
          <h1 className="font-bold">
            Why Lead Generation is Key for Business Growth
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex relative">
            <img src={postImg} alt="" className="aspect-square object-cover" />
            <div className="flex absolute bottom-0 left-0 bg-white p-3 gap-2">
              <h3 className="text-5xl">29</h3>
              <div className="flex flex-col">
                <h2>2019</h2>
                <h1>May</h1>
              </div>
            </div>
          </div>
          <h1 className="font-bold">
            Why Lead Generation is Key for Business Growth
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
