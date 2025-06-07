import React, { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav className="hidden lg:flex justify-around w-full h-16 items-center fixed text-white bg-[rgba(0,0,0,0.2)] z-20">
        <ul className="flex gap-10">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Sports</a>
          </li>
          <li>
            <a href="">News</a>
          </li>
        </ul>

        <div className="">Logo</div>

        <ul className="flex gap-10">
          <li>
            <a href="">Contact</a>
          </li>
          <li>
            <a href="">Teams</a>
          </li>
          <li>
            <a href="" className="px-5 py-1 rounded-2xl bg-blue-800">
              Login
            </a>
          </li>
        </ul>
      </nav>

      <nav className="flex justify-between fixed z-20 text-white w-full px-10 h-16 items-center lg:hidden bg-[rgba(0,0,0,0.2)]">
        <h1>Logo</h1>
        <button className="z-40" onClick={() => setToggle(!toggle)}>
          <i
            className={`text-xl transition-all ease-in-out ${
              toggle
                ? "text-black fa-solid fa-xmark"
                : "fa-solid fa-bars text-white"
            }`}
          ></i>
        </button>

        <div
          className={`${
            toggle ? "left-0" : "-left-[100vw]"
          } flex flex-col lg:hidden fixed top-0 h-screen w-screen z-20 bg-white items-center justify-center gap-5 transition-all ease-in-out text-black`}
        >
          <ul className="flex flex-col gap-5 text-center">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Sports</a>
            </li>
            <li>
              <a href="">News</a>
            </li>
          </ul>

          <ul className="flex flex-col gap-5 text-center">
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">Teams</a>
            </li>
            <li>
              <a
                href=""
                className="px-5 py-1 rounded-2xl bg-blue-800 text-white"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
