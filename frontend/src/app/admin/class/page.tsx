"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as ValidateToken from "@/utils/token.utils";
import * as ClassServices from "@/services/admin/ClassServices";

interface ClassItem {
  _id: string;
  name: string;
  code: string;
  status: string;
}

const ClassesPage = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await ClassServices.getClasses(accessToken);

        const activeClasses = res.data.filter(
          (c: ClassItem) => c.status === "active"
        );

        setClasses(activeClasses);
      } catch (error) {
        console.log("Lỗi khi lấy lớp học:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Bạn có chắc muốn xóa lớp học này?");
    if (!ok) return;

    try {
      setClasses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.log("Lỗi khi xóa lớp học:", error);
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg border w-full max-w-5xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Danh sách lớp học</h1>

          <Link
            href="/admin/class/add"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Thêm lớp học
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border text-center">#</th>
                <th className="p-3 border text-center">Tên lớp</th>
                <th className="p-3 border text-center">Mã lớp</th>
                <th className="p-3 border text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((c, index) => (
                <tr key={c._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">{c.name}</td>
                  <td className="p-3 border text-center">{c.code}</td>

                  <td className="p-3 border text-center space-x-2">
                    <Link
                      href={`/admin/classes/edit/${c._id}`}
                      className="px-4 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      Sửa
                    </Link>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="px-4 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {classes.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-gray-500 text-center">
                    Không có lớp học nào.
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

export default ClassesPage;
