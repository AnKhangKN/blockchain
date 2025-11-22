"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Subject {
  id: number;
  name: string;
  code: string;
  credit: number;
}

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Lập trình Web", code: "WEB101", credit: 3 },
    { id: 2, name: "Cơ sở dữ liệu", code: "DB101", credit: 3 },
    { id: 3, name: "Phân tích thiết kế", code: "SYS201", credit: 4 },
  ]);

  const handleDelete = (id: number) => {
    const ok = confirm("Bạn có chắc muốn xóa môn học này?");
    if (!ok) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg border w-full max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Danh sách môn học
          </h1>

          <Link
            href="/admin/subjects/add"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Thêm môn học
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Tên môn</th>
                <th className="p-3 border">Mã môn</th>
                <th className="p-3 border">Tín chỉ</th>
                <th className="p-3 border text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 border">{s.id}</td>
                  <td className="p-3 border">{s.name}</td>
                  <td className="p-3 border">{s.code}</td>
                  <td className="p-3 border">{s.credit}</td>

                  <td className="p-3 border text-center space-x-2">
                    <Link
                      href={`/admin/subjects/edit/${s.id}`}
                      className="px-4 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      Sửa
                    </Link>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="px-4 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {subjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-gray-500 text-center">
                    Không có môn học nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
