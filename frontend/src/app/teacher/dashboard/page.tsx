"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dữ liệu demo
const subjectStudents = [
  { name: "Lập trình Web", students: 42 },
  { name: "Cơ sở dữ liệu", students: 35 },
  { name: "Phân tích thiết kế", students: 28 },
];

// Phân bố điểm trung bình (demo)
const scoreData = [
  { name: "Giỏi", value: 40 },
  { name: "Khá", value: 32 },
  { name: "Trung Bình", value: 18 },
  { name: "Yếu", value: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const TeacherDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tổng quan giảng viên</h1>

      {/* Cards tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="p-5 bg-white shadow rounded-lg">
          <p className="text-gray-600">Tổng số môn đang dạy</p>
          <h2 className="text-3xl font-bold mt-2">
            {subjectStudents.length}
          </h2>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <p className="text-gray-600">Tổng số sinh viên</p>
          <h2 className="text-3xl font-bold mt-2">
            {subjectStudents.reduce((sum, s) => sum + s.students, 0)}
          </h2>
        </div>

        <div className="p-5 bg-white shadow rounded-lg">
          <p className="text-gray-600">Điểm trung bình</p>
          <h2 className="text-3xl font-bold mt-2">7.8</h2>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* BarChart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Số lượng sinh viên theo môn học
          </h2>

          <BarChart width={500} height={320} data={subjectStudents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#3b82f6" />
          </BarChart>
        </div>

        {/* PieChart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Phân bố mức điểm sinh viên
          </h2>

          <PieChart width={500} height={320}>
            <Pie
              data={scoreData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {scoreData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
