"use client";

import React from "react";
import { usePathname } from "next/navigation";

const HeaderComponent = () => {
  const pathname = usePathname();

  const pathNavigate = [
    { name: "Dashboard", link: "/teacher/dashboard" },
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
        {activeItem ? activeItem.name : "Teacher Panel"}
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-gray-200 rounded-full w-8 h-8"></div>
        <div>admin@gmail.com</div>
      </div>
    </div>
  );
};

export default HeaderComponent;
