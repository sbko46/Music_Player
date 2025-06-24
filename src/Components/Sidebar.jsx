import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaHome, FaClock, FaFire, FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItemClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200 text-sm font-medium hover:bg-white/10 ${
      isActive ? "bg-white/10 text-green-400" : "text-white"
    }`;

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-[#2a0900] text-white">
        <h1 className="text-2xl font-bold">🎵 MyPlayer</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-gradient-to-b from-[#3a1c0e] to-[#2a0900] text-white p-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-1/5 md:h-screen`}
      >
        <h1 className="text-3xl font-bold mb-8 tracking-wide hidden md:block">🎵 MyPlayer</h1>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={navItemClasses}>
            <FaHome /> For You
          </NavLink>
          <NavLink to="/top-tracks" className={navItemClasses}>
            <FaFire /> Top Trends
          </NavLink>
          <NavLink to="/favourites" className={navItemClasses}>
            <FaHeart /> Favourites
          </NavLink>
          <NavLink to="/recently-played" className={navItemClasses}>
            <FaClock /> Recently Played
          </NavLink>
        </nav>

        <div className="absolute bottom-4 left-4 text-xs text-white/60 hidden md:block">
          Developed by Saurabh 💻
        </div>
      </div>
    </>
  );
}
