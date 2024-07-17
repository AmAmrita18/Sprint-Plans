import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { GiSoccerField } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Subheader = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#f3f4f6] pb-1 px-1">
      <div className=" mx-auto py-4 pt-4 pb-2 px-6 flex flex-row justify-between bg-white">
        <div>
          <h1 className="text-[15px] text-[#9ca3af] font-[700]">
            Last task completed on Sep 30
          </h1>
        </div>
        <div className="flex flex-row items-center">
          <ul className="flex flex-row text-[15px] gap-6 text-[#9ca3af] font-[700]">
            <li className="flex justify-center items-center">
              <FaRegCheckCircle className="mr-2" />
              Done
            </li>
            <li className="flex justify-center items-center">
              <IoFilterSharp className="mr-2" />
              Filter
            </li>
            <li className="pr-6 border-r-[3px] border-[#e5e7eb] flex justify-center items-center">
              <BiSortAlt2 className="mr-2" />
              Sort
            </li>
            <li className="flex justify-center items-center">
              <AiFillThunderbolt className="mr-2" />
              Rules
            </li>
            <li className="flex justify-center items-center">
              <GiSoccerField className="mr-2 font-[800]" />
              Fields
            </li>
          </ul>
          <div className="ml-6 mr-">
            <HiOutlineDotsHorizontal className="text-[20px] text-[#9ca3af] font-[700]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
