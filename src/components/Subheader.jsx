import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { GiSoccerField } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Subheader = () => {
  const menuItems = [
    { icon: FaRegCheckCircle, text: "Done" },
    { icon: IoFilterSharp, text: "Filter" },
    {
      icon: BiSortAlt2,
      text: "Sort",
      className: "border-r-[3px] border-[#e5e7eb]",
    },
    { icon: AiFillThunderbolt, text: "Rules" },
    { icon: GiSoccerField, text: "Fields" },
  ];

  return (
    <div className="w-full bg-[#f3f4f6] pb-1 px-1">
      <div className="mx-auto py-4 pt-4 pb-2 px-6 flex flex-col sm:flex-row justify-between bg-white">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-[15px] text-[#9ca3af] font-[700]">
            Last task completed on Sep 30
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-between sm:justify-end">
          <ul className="flex flex-wrap text-[15px] gap-4 sm:gap-6 text-[#9ca3af] font-[700] mb-4 sm:mb-0">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center ${item.className || ""} ${
                  index === 2 ? "pr-4 sm:pr-6" : ""
                }`}
              >
                <item.icon className="mr-2" />
                {item.text}
              </li>
            ))}
          </ul>
          <div className="ml-auto sm:ml-6">
            <HiOutlineDotsHorizontal className="text-[20px] text-[#9ca3af] font-[700]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
