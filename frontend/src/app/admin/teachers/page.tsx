"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  active: boolean;
}

// Dữ liệu demo với trạng thái hoạt động
const initialTeachers: Teacher[] = Array.from({ length: 37 }, (_, i) => ({
  id: i + 1,
  name: `Giảng viên ${i + 1}`,
  email: `teacher${i + 1}@school.edu`,
  subject: ["Toán", "Lý", "Hóa", "Văn"][i % 4],
  active: i % 3 !== 0, // ví dụ: 1/3 giảng viên không hoạt động
}));

const PAGE_SIZE = 10;

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Teacher>({
    id: teachers.length + 1,
    name: "",
    email: "",
    subject: "Toán",
    active: true,
  });

  const totalPages = Math.ceil(teachers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentTeachers = teachers.slice(startIndex, startIndex + PAGE_SIZE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTeacher(prev => ({
      ...prev,
      [name]: name === "active" ? value === "true" : value,
    }));
  };

  const handleAdd = () => {
    setTeachers(prev => [...prev, { ...newTeacher, id: prev.length + 1 }]);
    setIsAdding(false);
    setNewTeacher({
      id: teachers.length + 2,
      name: "",
      email: "",
      subject: "Toán",
      active: true,
    });
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
        Danh sách Giảng viên
        <button
          onClick={() => setIsAdding(true)}
          className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 text-sm font-medium shadow-sm"
        >
          Thêm giảng viên mới
        </button>
      </h1>

      {/* Form thêm giảng viên */}
      {isAdding && (
        <div className="mb-6 p-6 bg-white shadow rounded-lg flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Thêm Giảng viên mới</h2>
          <input
            type="text"
            name="name"
            placeholder="Tên giảng viên"
            value={newTeacher.name}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newTeacher.email}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-full"
          />
          <select
            name="subject"
            value={newTeacher.subject}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-full"
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
            className="px-3 py-2 border rounded w-full"
          >
            <option value="true">Hoạt động</option>
            <option value="false">Không còn hoạt động</option>
          </select>
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Lưu
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Bảng danh sách giảng viên */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">ID</th>
              <th className="px-6 py-3 text-left font-medium">Tên Giảng viên</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Môn học</th>
              <th className="px-6 py-3 text-left font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTeachers.map(teacher => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{teacher.id}</td>
                <td className="px-6 py-4 text-blue-600 hover:underline">
                  <button
                    onClick={() => router.push(`/admin/teachers/${teacher.id}`)}
                    className="bg-none border-none text-blue-600 cursor-pointer hover:underline"
                  >
                    {teacher.name}
                  </button>
                </td>
                <td className="px-6 py-4">{teacher.email}</td>
                <td className="px-6 py-4">{teacher.subject}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                      teacher.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {teacher.active ? "Hoạt động" : "Không còn hoạt động"}
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
          onClick={() => setCurrentPage(p => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
