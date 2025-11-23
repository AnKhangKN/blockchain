"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FiChevronDown } from "react-icons/fi";

const HeaderComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4 shadow-md">
      {/* Title */}
      <div className="text-2xl font-bold text-gray-800">Student</div>

      {/* User Menu */}
      <div className="relative">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2 transition-all"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {/* Avatar */}
          <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold text-lg">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>

          {/* Email */}
          <div className="text-gray-700 font-medium">
            {user?.email || "No email"}
          </div>

          {/* Chevron */}
          <FiChevronDown
            className={`text-gray-500 transition-transform duration-200 ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {openMenu && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-xl py-2 z-20 transition-all duration-200">
            <button
              onClick={() => {
                localStorage.removeItem("accessToken"); // Xóa token khi logout
                router.push("/login");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium rounded-md transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
