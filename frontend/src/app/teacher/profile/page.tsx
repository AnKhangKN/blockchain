"use client";

import React, { useState } from "react";

const TeacherProfilePage = () => {
  const [teacher, setTeacher] = useState({
    name: "Nguyễn Văn A",
    email: "teacherA@university.edu",
    phone: "0901 234 567",
    department: "Công nghệ thông tin",
    avatar:
      "https://i.pravatar.cc/150?img=12", // Avatar demo
  });

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Hồ sơ giảng viên
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={teacher.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border shadow"
          />
        </div>

        {/* Thông tin giảng viên */}
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Họ và tên</label>
            <input
              type="text"
              disabled
              value={teacher.name}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="text"
              disabled
              value={teacher.email}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Số điện thoại</label>
            <input
              type="text"
              disabled
              value={teacher.phone}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Khoa / Bộ môn</label>
            <input
              type="text"
              disabled
              value={teacher.department}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Cập nhật thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
