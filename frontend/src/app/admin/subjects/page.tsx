"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as ValidateToken from "@/utils/token.utils";
import * as SubjectServices from "@/services/admin/SubjectServices";

interface Subject {
  _id: string;
  name: string;
  code: string;
  credit: number;
  status: string;
}

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await SubjectServices.getSubjects(accessToken);

        const activeSubjects = res.data.filter(
          (s: Subject) => s.status === "active"
        );

        setSubjects(activeSubjects);
      } catch (error) {
        console.log("Lỗi khi lấy môn học:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Bạn có chắc muốn xóa môn học này?");
    if (!ok) return;

    try {
      setSubjects((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.log("Lỗi khi xóa môn học:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Danh sách môn học
          </h1>

          <Link
            href="/admin/subjects/add"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition"
          >
            + Thêm môn học
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg border">
          <table className="w-full text-gray-700 table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-center text-gray-600 font-medium">#</th>
                <th className="p-4 text-center text-gray-600 font-medium">
                  Tên môn
                </th>
                <th className="p-4 text-center text-gray-600 font-medium">
                  Mã môn
                </th>
                <th className="p-4 text-center text-gray-600 font-medium">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((s, index) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-green-50 transition cursor-pointer"
                >
                  <td className="p-4 text-center font-medium">{index + 1}</td>
                  <td className="p-4 text-center font-semibold text-gray-800">
                    {s.name}
                  </td>
                  <td className="p-4 text-center text-gray-600">{s.code}</td>

                  <td className="p-4 text-center flex justify-center gap-3">
                    <Link
                      href={`/admin/subjects/edit/${s._id}`}
                      className="px-5 py-2 bg-yellow-500 text-white rounded-xl font-medium shadow hover:bg-yellow-600 hover:shadow-md transition"
                    >
                      Sửa
                    </Link>

                    {/* <button
                      onClick={() => handleDelete(s._id)}
                      className="px-5 py-2 bg-red-600 text-white rounded-xl font-medium shadow hover:bg-red-700 hover:shadow-md transition"
                    >
                      Xóa
                    </button> */}
                  </td>
                </tr>
              ))}

              {subjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-gray-500 text-center">
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
