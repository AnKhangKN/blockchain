"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; // import RootState từ store của bạn

const HeaderComponent = () => {
  const pathname = usePathname();

  // Lấy user từ Redux store
  const user = useSelector((state: RootState) => state.user);

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

  // Tìm item khớp path hiện tại
  const activeItem = pathNavigate.find((i) => pathname.startsWith(i.link));

  return (
    <div className="bg-white border-b border-gray-100 flex items-center justify-between p-4 shadow-md">
      {/* CHỈ HIỂN THỊ MỤC ĐANG ACTIVE */}
      <div className="text-xl font-semibold text-gray-700">
        {activeItem ? activeItem.name : "Quản lý giảng viên"}
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-gray-200 rounded-full w-8 h-8"></div>
        <div>{user?.email || "No email"}</div>
      </div>
    </div>
  );
};

export default HeaderComponent;
