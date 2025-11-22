"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SidebarComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { label: "Quản lý", path: "/teacher/dashboard" },
    { label: "Sinh viên", path: "/teacher/students" },
    { label: "Điểm", path: "/teacher/grades" },
    { label: "Trang cá nhân", path: "/teacher/profile" },
  ];

  return (
    <div className="bg-gray-100 border-r h-screen w-64 p-4">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>

      <div className="flex flex-col gap-2">
        {menu.map((item) => {
          const active = pathname.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`
                w-full text-left px-4 py-2 rounded-md
                ${active ? "bg-blue-500 text-white" : "hover:bg-gray-200"}
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarComponent;
