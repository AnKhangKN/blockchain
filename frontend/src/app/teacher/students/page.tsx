"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Student {
  id: number;
  name: string;
  email: string;
  subject: string; 
  active: boolean;
}

const initialStudents: Student[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `Sinh viên ${i + 1}`,
  email: `student${i + 1}@school.edu`,
  subject: ["Toán", "Lập trình", "UX/UI", "Mạng máy tính"][i % 4],
  active: i % 3 !== 0,
}));

const PAGE_SIZE = 10;

export default function StudentsPage() {
  const [students] = useState<Student[]>(initialStudents);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(students.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentStudents = students.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Danh sách Sinh viên</h1>

        <Link
          href="/teacher/students/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-{}}"
        >
          + Thêm Sinh viên
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Tên Sinh viên</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Môn học</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentStudents.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{s.id}</td>

                <td className="px-6 py-4 text-blue-600 hover:underline">
                  <Link href={`/teacher/students/${s.id}`}>{s.name}</Link>
                </td>

                <td className="px-6 py-4">{s.email}</td>

                <td className="px-6 py-4">{s.subject}</td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      inline-flex items-center justify-center whitespace-nowrap
                      px-3 py-1 rounded-full text-white text-sm
                      ${s.active ? "bg-green-600" : "bg-red-600"}
                    `}
                  >
                    {s.active ? "Đang học" : "Đã nghỉ"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
