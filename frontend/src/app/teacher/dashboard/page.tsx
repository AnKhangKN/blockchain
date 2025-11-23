"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Dữ liệu demo
const subjectStudents = [
  { name: "Lập trình Web", students: 42 },
  { name: "Cơ sở dữ liệu", students: 35 },
  { name: "Phân tích thiết kế", students: 28 },
];

// Dữ liệu lớp học (demo)
const totalClasses = 12; // ⭐ Thêm số lớp học

const TeacherDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tổng quan giảng viên</h1>

      {/* Cards tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Tổng số môn */}
        <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Tổng số môn đang dạy</p>
          <h2 className="text-4xl font-bold mt-2">{subjectStudents.length}</h2>
        </div>

        {/* Tổng số sinh viên */}
        <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Tổng số sinh viên</p>
          <h2 className="text-4xl font-bold mt-2">
            {subjectStudents.reduce((sum, s) => sum + s.students, 0)}
          </h2>
        </div>

        {/* Điểm trung bình */}
        <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Điểm trung bình</p>
          <h2 className="text-4xl font-bold mt-2">7.8</h2>
        </div>

        {/* ⭐ Tổng số lớp học */}
        <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Tổng số lớp học</p>
          <h2 className="text-4xl font-bold mt-2">{totalClasses}</h2>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-xl font-semibold mb-6">
          Số lượng sinh viên theo môn học
        </h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectStudents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
