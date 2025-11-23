"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as ValidateToken from "@/utils/token.utils";
import * as UserServices from "@/services/admin/UserServices";

interface User {
  _id: string;
  email: string;
  isTeacher: boolean;
  isAdmin: boolean;
  status: string;
  subjects: string[];
  createdAt: string;
}

const PAGE_SIZE = 10;

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await UserServices.getUsers(accessToken);
        setTeachers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const totalPages = Math.ceil(teachers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentTeachers = teachers.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                STT
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Tên người dùng
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Quyền
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentTeachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">{startIndex + index + 1}</td>

                <td className="px-6 py-4 text-blue-600 hover:underline">
                  <button
                    onClick={() =>
                      router.push(`/admin/teachers/${teacher._id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {teacher.email.split("@")[0]}
                  </button>
                </td>

                <td className="px-6 py-4">{teacher.email}</td>

                <td className="px-6 py-4">
                  {teacher.isAdmin
                    ? "Admin"
                    : teacher.isTeacher
                    ? "Giảng viên"
                    : "Sinh viên"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      teacher.status === "active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {teacher.status === "active"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 items-center flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-md transition ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>
    </main>
  );
}
