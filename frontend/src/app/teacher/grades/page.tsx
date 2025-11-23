"use client";

import React from "react";
import { useRouter } from "next/navigation";

const teacherSubjects = [
  {
    id: 1,
    subject: "Lập trình Web",
    credits: 3,
    className: "CNTT01",
    status: "Đang diễn ra",
  },
  {
    id: 2,
    subject: "Cơ sở dữ liệu",
    credits: 4,
    className: "CNTT03",
    status: "Đã kết thúc",
  },
  {
    id: 3,
    subject: "Mạng máy tính",
    credits: 3,
    className: "CNTT02",
    status: "Đang diễn ra",
  },
];

export default function Grades() {
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      {/* Header – ĐÃ BỎ NÚT NHẬP ĐIỂM MỚI */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý điểm</h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Danh sách môn học đang phụ trách
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Môn học</th>
                <th className="p-3 text-center">Số tín chỉ</th>
                <th className="p-3 text-center">Lớp học</th>
                <th className="p-3 text-center">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {teacherSubjects.map((item) => (
                <tr
                  key={item.id}
                  onClick={() =>
                    router.push(`/teacher/grades/subject/${item.id}`)
                  }
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-3">{item.subject}</td>
                  <td className="p-3 text-center">{item.credits}</td>
                  <td className="p-3 text-center font-medium text-blue-600">
                    {item.className}
                  </td>
                  <td
                    className={`p-3 text-center font-medium ${
                      item.status === "Đang diễn ra"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
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
