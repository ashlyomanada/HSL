import { logout } from "@/services/auth";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isBgWhite, setIsBgWhite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      label: "HOME",
      path: "/home",
    },
    {
      label: "GAMES",
      path: "/games",
    },
    {
      label: "ABOUT",
      path: "/about",
    },
    {
      label: "STANDINGS",
      path: "/standings",
    },
    {
      label: "BLOGS",
      path: "/blogs",
    },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      try {
        await logout(); // Call API or remove token
        sessionStorage.clear(); // Optional: clear all session
        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        );
        navigate("/");
      } catch (error) {
        Swal.fire("Error", "Something went wrong while logging out.", "error");
      }
    }
  };

  const handleCheckLogin = () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role) {
      Swal.fire({
        title: "Unauthorized",
        text: "You must log in first to continue.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    setIsBgWhite(false);
    if (location.pathname === "/home") {
      const handleScroll = () => {
        const scrollThreshold = 100;
        if (window.scrollY > scrollThreshold) {
          setIsBgWhite(true);
        } else {
          setIsBgWhite(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setIsBgWhite(true);
    }
  }, [location]);

  return (
    <div
      className={`fixed top-0 w-full z-40 flex justify-between items-center pr-5 xl:pr-20 transition-colors duration-500 ${
        isBgWhite
          ? "bg-white text-black shadow-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex bg-[#171b21] logo pl-5 xl:pl-20 items-center w-[28%] h-18">
        <h1 className="text-3xl text-white">HSL</h1>
      </div>

      <ul className="hidden lg:flex gap-10 items-center">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className={`text-sm font-semibold ${
                link.path === location.pathname && "text-[#eb2e4c]"
              }`}
              onClick={handleCheckLogin}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {sessionStorage.getItem("token") && sessionStorage.getItem("role") && (
          <button
            onClick={handleLogout}
            className="btn bg-[#eb2e4c] text-white"
          >
            LOGOUT
          </button>
        )}
      </ul>

      {/* Mobile Menu */}
      <ul
        className={`flex flex-col items-start absolute transition-all duration-500 ease-in-out top-18 ${
          toggle ? "left-0 opacity-100" : "-left-full opacity-0"
        } h-[300px] w-full bg-[#041d6d] text-white lg:hidden gap-5 justify-center px-5`}
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className={`text-sm font-semibold ${
                link.path === location.pathname && "text-[#eb2e4c]"
              }`}
              onClick={() => setToggle(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <button onClick={handleLogout} className="btn bg-[#eb2e4c] text-white">
          LOGOUT
        </button>
      </ul>

      <button
        className="flex lg:hidden mr-4"
        onClick={() => setToggle(!toggle)}
      >
        <i
          className={`fa-solid ${
            toggle ? "fa-xmark" : "fa-bars"
          } text-2xl font-semibold`}
        ></i>
      </button>
    </div>
  );
};

export default Navbar;
