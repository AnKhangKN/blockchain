"use client";

import React from "react";
import { useRouter } from "next/navigation";

const dummyGrades = [
  {
    id: 1,
    student: "Nguyễn Văn A",
    subject: "Lập trình Web",
    mid: 7.5,
    final: 8.0,
    total: 7.8,
  },
  {
    id: 2,
    student: "Trần Thị B",
    subject: "Cơ sở dữ liệu",
    mid: 6.5,
    final: 7.0,
    total: 6.8,
  },
  {
    id: 3,
    student: "Phạm Văn C",
    subject: "Mạng máy tính",
    mid: 8.0,
    final: 8.5,
    total: 8.3,
  },
];

export default function Grades() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý điểm</h1>

        {/* Nút nhập điểm mới */}
        <button
          onClick={() => router.push("/teacher/grades/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow transition font-medium"
        >
          + Nhập điểm mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Danh sách điểm sinh viên
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Sinh viên</th>
                <th className="p-3 text-left">Môn học</th>
                <th className="p-3 text-center">Giữa kỳ</th>
                <th className="p-3 text-center">Cuối kỳ</th>
                <th className="p-3 text-center">Tổng kết</th>
              </tr>
            </thead>

            <tbody>
              {dummyGrades.map((g) => (
                <tr
                  key={g.id}
                  onClick={() => router.push(`/teacher/grades/${g.id}`)}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-3">{g.student}</td>
                  <td className="p-3">{g.subject}</td>
                  <td className="p-3 text-center">{g.mid}</td>
                  <td className="p-3 text-center">{g.final}</td>
                  <td className="p-3 text-center font-semibold text-blue-600">
                    {g.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
