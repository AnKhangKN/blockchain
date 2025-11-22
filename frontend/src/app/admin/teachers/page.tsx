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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    subject: "Toán",
    active: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await UserServices.getUsers(accessToken);

        const teachersData = res.data;
        setTeachers(teachersData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const totalPages = Math.ceil(teachers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentTeachers = teachers.slice(startIndex, startIndex + PAGE_SIZE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleAdd = () => {
    const newData = {
      _id: crypto.randomUUID(),
      email: newTeacher.email,
      isTeacher: true,
      isAdmin: false,
      status: newTeacher.active ? "active" : "inactive",
      subjects: [newTeacher.subject],
      createdAt: new Date().toISOString(),
    };

    setTeachers((prev) => [...prev, newData]);
    setIsModalOpen(false);

    setNewTeacher({
      name: "",
      email: "",
      subject: "Toán",
      active: true,
    });
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
        Danh sách Giảng viên
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 text-sm font-medium shadow-sm"
        >
          Thêm giảng viên mới
        </button>
      </h1>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Thêm Giảng viên mới</h2>

            <input
              type="text"
              name="name"
              placeholder="Tên giảng viên"
              value={newTeacher.name}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full mb-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newTeacher.email}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full mb-3"
            />

            {/* Chỗ này giữ lại subject trong modal (nếu sau này cần dùng), 
                nhưng KHÔNG HIỂN THỊ ra bảng */}
            <select
              name="subject"
              value={newTeacher.subject}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full mb-3"
            >
              <option value="Toán">Toán</option>
              <option value="Lý">Lý</option>
              <option value="Hóa">Hóa</option>
              <option value="Văn">Văn</option>
            </select>

            <select
              name="active"
              value={newTeacher.active.toString()}
              onChange={handleChange}
              className="px-3 py-2 border rounded w-full mb-4"
            >
              <option value="true">Hoạt động</option>
              <option value="false">Không còn hoạt động</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Lưu
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">#</th>
              <th className="px-6 py-3 text-left font-medium">
                Tên Giảng viên
              </th>
              <th className="px-6 py-3 text-left font-medium">Email</th>

              {/* 🔥 ĐÃ BỎ CỘT MÔN DẠY */}

              <th className="px-6 py-3 text-left font-medium">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentTeachers.map((teacher, index) => (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{startIndex + index + 1}</td>

                <td className="px-6 py-4 text-blue-600 hover:underline">
                  <button
                    onClick={() =>
                      router.push(`/admin/teachers/${teacher._id}`)
                    }
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    {teacher.email.split("@")[0]}
                  </button>
                </td>

                <td className="px-6 py-4">{teacher.email}</td>

                {/* ❌ GỠ HOÀN TOÀN MÔN DẠY — KHÔNG HIỂN THỊ */}

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
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
