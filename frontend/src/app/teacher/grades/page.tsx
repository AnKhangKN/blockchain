"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Grades() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý điểm</h1>

        <button onClick={() => router.push("/teacher/grades/new")}>
          Thêm điểm
        </button>
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
                <th className="p-3 text-center">Mã môn</th>
              </tr>
            </thead>

            <tbody>
              {user.subjects.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 transition cursor-default"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-center">{item.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
