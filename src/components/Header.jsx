import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import img1 from "../assets/people (1).png";
import img2 from "../assets/people (2).png";
import img3 from "../assets/people (3).png";
import img4 from "../assets/people (4).png";
import { HiPlus, HiMenu } from "react-icons/hi";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NAV_OPTIONS = [
    { id: `NAV001`, title: `Overview`, path: `#` },
    { id: `NAV002`, title: `List`, path: `#` },
    { id: `NAV003`, title: `Board`, path: `board` },
    { id: `NAV004`, title: `Timeline`, path: `#` },
    { id: `NAV005`, title: `Calender`, path: `#` },
    { id: `NAV006`, title: `Dashboard`, path: `#` },
    { id: `NAV007`, title: `Messages`, path: `#` },
    { id: `NAV008`, title: `More...`, path: `#` },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-[#f3f4f6] py-1 px-1">
      <div className="mx-auto py-4 pt-4 pb-2 px-6 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="flex flex-row gap-3 items-center w-full lg:w-auto">
            <div className="w-[45px] h-[45px] bg-[#a3e635] rounded-md mb-2">
              <img src="" alt="" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[23px] font-[800] text-[#4b5563] mb-1">
                Sprint Plans
              </h1>
              <div className="hidden lg:flex flex-row gap-x-5">
                {NAV_OPTIONS.map((nav) => (
                  <NavLink
                    key={nav.id}
                    to={`/${nav.path}`}
                    className={({ isActive }) =>
                      isActive && nav.path !== "#"
                        ? "text-[#a3e635] hover:border-b-[3px] hover:border-[#a3e635]"
                        : "text-[#9ca3af] hover:text-[#a3e635] "
                    }
                  >
                    <h3 className="text-[15px] mb-2 cursor-pointer font-[800]">
                      {nav.title}
                    </h3>
                  </NavLink>
                ))}
              </div>
            </div>
            <button
              className="lg:hidden ml-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <HiMenu className="text-[25px] text-[#4b5563]" />
            </button>
          </div>

          <div
            className={`flex flex-col lg:flex-row gap-3 items-start lg:items-center w-full lg:w-auto mt-4 lg:mt-0 ${
              isMenuOpen ? "block" : "hidden lg:flex"
            }`}
          >
            <div className="lg:hidden flex flex-col gap-y-2 w-full mb-4">
              {NAV_OPTIONS.map((nav) => (
                <NavLink
                  key={nav.id}
                  to={`/${nav.path}`}
                  className={({ isActive }) =>
                    isActive && nav.path !== "#"
                      ? "text-[#a3e635] hover:border-b-[3px] hover:border-[#a3e635]"
                      : "text-[#9ca3af] hover:text-[#a3e635] "
                  }
                >
                  <h3 className="text-[15px] cursor-pointer font-[800]">
                    {nav.title}
                  </h3>
                </NavLink>
              ))}
            </div>

            <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
              <div className="flex flex-row items-center border-r-[3px] border-[#e5e7eb] pr-3">
                <div className="z-30">
                  <img src={img1} alt="" className="w-9 h-9 rounded-full" />
                </div>
                <div className="-ml-2 z-20">
                  <img src={img2} alt="" className="w-9 h-9 rounded-full" />
                </div>
                <div className="-ml-2 z-10">
                  <img src={img3} alt="" className="w-9 h-9 rounded-full" />
                </div>
                <div className="-ml-2">
                  <img
                    src={img4}
                    alt=""
                    className="w-9 h-9 rounded-full mr-3"
                  />
                </div>
              </div>

              <form
                onSubmit={handleSearch}
                className="relative flex-grow lg:flex-grow-0"
              >
                <div className="flex items-center border-2 w-full lg:w-[160px] border-[#9ca3af] hover:border-[#4b5563] rounded-full overflow-hidden">
                  <button
                    type="submit"
                    className="text-[#9ca3af] px-2 py-1 hover:text-[#4b5563] transition duration-300"
                  >
                    <FaSearch className="h-5 w-5 ml-1" />
                  </button>
                  <input
                    type="text"
                    placeholder=""
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full focus:outline-none"
                  />
                </div>
              </form>

              <button className="bg-[#f87171] shadow-lg p-1 rounded-full">
                <HiPlus className="text-white text-[25px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
