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
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Tổng hợp</h1>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white transition hover:scale-[1.02]"
          >
            <p className="text-md opacity-90">{item.label}</p>
            <p className="text-4xl font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Biểu đồ */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">Thống kê sinh viên theo khoa</h2>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sv" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
