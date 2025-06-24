import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useToggle } from "@/context/ToggleProvider";

const navItems = [
  { to: "/admin/dashboard", icon: "fa-chart-simple", label: "Dashboard" },
  { to: "/admin/schedule", icon: "fa-calendar-days", label: "Schedule" },
  { to: "/admin/matches", icon: "fa-trophy", label: "Matches" },
  { to: "/admin/results", icon: "fa-ranking-star", label: "Results" },
  { to: "/admin/teams", icon: "fa-people-group", label: "Teams" },
  { to: "/admin/standings", icon: "fa-medal", label: "Standings" },
  { to: "/admin/leagues", icon: "fa-award", label: "Leagues" },
  { to: "/admin/categories", icon: "fa-layer-group", label: "Categories" },
  { to: "/admin/schools", icon: "fa-school", label: "Schools" },
  { to: "/admin/photos", icon: "fa-images", label: "Photos" },
];
const NavItem = ({ to, icon, label, isActive, toggle, handleToggle }) => (
  <li
    className={`hover:bg-blue-900 transition-all duration-300 py-3 
      ${toggle ? "rounded-lg px-3" : "rounded-full px-5"} 
      ${isActive ? "bg-blue-900 text-white" : "bg-transparent"}`}
  >
    <Link
      to={to}
      className={`flex gap-5 items-center ${
        toggle ? "justify-start" : "justify-center"
      }`}
      onClick={handleToggle}
    >
      <i className={`fa-solid ${icon} ${toggle ? "w-5" : "w-0"}`}></i>
      <span>{toggle && label}</span>
    </Link>
  </li>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const { toggle, setToggle } = useToggle();
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar large size*/}
      <nav
        className={`hidden fixed left-0 top-0 h-screen overflow-y-auto transition-all duration-300 bg-darkBlue text-white lg:flex flex-col gap-10 p-5 ${
          toggle ? "w-[20%]" : "w-[6%]"
        }`}
      >
        <div className="flex justify-start items-center gap-3 px-2.5">
          <i className="fa-solid fa-user-tie text-xl"></i>
          <h1
            className={`px-2 lg:text-xl xl:text-2xl font-semibold transition-all ease-in-out ${
              toggle ? "opacity-100" : "opacity-0"
            }`}
          >
            HSL Admin
          </h1>
        </div>

        <ul className="flex flex-col gap-1">
          {navItems.map(({ to, icon, label }) => (
            <NavItem
              key={to}
              to={to}
              icon={icon}
              label={label}
              isActive={pathname.includes(to)}
              toggle={toggle}
            />
          ))}
        </ul>
      </nav>

      {/* Sidebar large smallsize*/}
      <nav
        className={`fixed w-screen top-0 h-screen transition-all ease-in-out duration-500 bg-darkBlue text-white flex flex-col gap-10 p-5 z-30 lg:hidden ${
          toggle ? "left-[-100vw]" : "left-0"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="text-center px-2 text-2xl font-semibold">HSL</h1>
          <button onClick={() => setToggle(!toggle)}>
            <i className="fa-solid fa-xmark font-semibold text-3xl cursor-pointer"></i>
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {navItems.map(({ to, icon, label }) => (
            <NavItem
              key={to}
              to={to}
              icon={icon}
              label={label}
              isActive={pathname.includes(to)}
              toggle={true}
              handleToggle={handleToggle}
            />
          ))}
        </ul>
      </nav>

      {/* Topbar */}
      <div
        className={`fixed top-0 right-0 h-14 bg-white flex items-center px-5 transition-all duration-300 w-full z-20 ${
          toggle ? "lg:w-[80%]" : "lg:w-[93%]"
        }`}
      >
        <button
          className="cursor-pointer"
          onClick={() => setToggle(!toggle)}
          aria-label="Toggle Sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </>
  );
};

export default Navbar;
