"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
  active: boolean;
}

// Demo data
const initialStudents: Student[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `Sinh viên ${i + 1}`,
  email: `student${i + 1}@school.edu`,
  major: ["CNTT", "Kinh tế", "Luật", "Điện tử"][i % 4],
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
      <h1 className="text-3xl font-bold mb-6">Danh sách Sinh viên</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">ID</th>
              <th className="px-6 py-3 text-left font-medium">Tên Sinh viên</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Ngành học</th>
              <th className="px-6 py-3 text-left font-medium">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{student.id}</td>

                {/* Click để mở trang chi tiết */}
                <td className="px-6 py-4 text-blue-600 hover:underline">
                  <Link href={`/teacher/students/${student.id}`}>
                    {student.name}
                  </Link>
                </td>

                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.major}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                      student.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {student.active ? "Đang học" : "Đã nghỉ"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
