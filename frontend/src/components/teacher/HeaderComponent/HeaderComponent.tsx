"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { FiChevronDown } from "react-icons/fi"; // icon mũi tên xuống

const HeaderComponent = () => {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);

  const pathNavigate = [
    { name: "Dashboard", link: "/teacher/dashboard" },
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Quản lý môn học", link: "/admin/subjects" },
    { name: "Quản lý người dùng", link: "/admin/teachers" },
    { name: "Quản lý sinh viên", link: "/admin/student" },
    { name: "Quản lý lớp học", link: "/admin/class" },
    { name: "Grades", link: "/teacher/grades" },
    { name: "Students", link: "/teacher/students" },
    { name: "Profile", link: "/teacher/profile" },
  ];

  const activeItem = pathNavigate.find((i) => pathname.startsWith(i.link));

  return (
    <div className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4 shadow-sm">
      {/* Title */}
      <div className="text-2xl font-bold text-gray-800">
        {activeItem ? activeItem.name : "Quản lý giảng viên"}
      </div>

      {/* User Menu */}
      <div className="relative">
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2 transition-all"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {/* Avatar */}
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          {/* Email */}
          <div className="text-gray-700 font-medium">
            {user?.email || "No email"}
          </div>
          {/* Chevron */}
          <FiChevronDown
            className={`text-gray-500 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {openMenu && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-20 animate-fade-in">
            <button
              onClick={() => router.push("/login")}
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
