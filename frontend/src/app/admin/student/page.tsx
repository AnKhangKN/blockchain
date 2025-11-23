"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as UserServices from "@/services/admin/UserServices";
import * as ValidateToken from "@/utils/token.utils";

interface Student {
  id: number;
  fullName: string;
  email: string;
  status: string;
}

const PAGE_SIZE = 10;

export default function StudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await UserServices.getUsers(accessToken);

        const studentsFromApi = res.data
          .filter((user: any) => !user.isAdmin && !user.isTeacher)
          .map((user: any) => ({
            id: user._id, // backend id
            fullName: user.fullName || user.email.split("@")[0],
            email: user.email,
            status: user.status,
          }));

        setStudents(studentsFromApi);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, []);

  const totalPages = Math.ceil(students.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentStudents = students.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Danh sách Sinh viên</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Tên Sinh viên</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentStudents.map((s, index) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{startIndex + index + 1}</td>
                <td className="px-6 py-4 text-blue-600 hover:underline">
                  <Link href={`/admin/student/${s.id}`}>{s.fullName}</Link>
                </td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm ${
                      s.status === "active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {s.status === "active" ? "Đang học" : "Đã nghỉ"}
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
