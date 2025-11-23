"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Giảng viên", value: 42 },
  { label: "Sinh viên", value: 350 },
  { label: "Môn học", value: 18 },
];

const chartData = [
  { name: "CNTT", sv: 120 },
  { name: "Kinh tế", sv: 80 },
  { name: "Luật", sv: 60 },
  { name: "Điện tử", sv: 90 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-10">
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight">Tổng hợp</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white transition duration-200 hover:scale-[1.03] hover:shadow-xl"
          >
            <p className="text-lg opacity-90">{item.label}</p>
            <p className="text-5xl font-semibold mt-3">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border space-y-6">
        <h2 className="text-2xl font-semibold">Thống kê sinh viên theo khoa</h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sv" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
