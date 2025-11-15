"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  active: boolean;
}

// Dữ liệu demo
const teachersData: Teacher[] = Array.from({ length: 37 }, (_, i) => ({
  id: i + 1,
  name: `Giảng viên ${i + 1}`,
  email: `teacher${i + 1}@school.edu`,
  subject: ["Toán", "Lý", "Hóa", "Văn"][i % 4],
  active: true,
}));

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();

  const teacherId = Number(params.id);
  const teacherObj = teachersData.find((t) => t.id === teacherId);

  const [teacher, setTeacher] = useState<Teacher | null>(teacherObj || null);
  const [isEditing, setIsEditing] = useState(false);

  if (!teacher)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-semibold">Không tìm thấy giảng viên.</p>
      </div>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTeacher(prev => prev ? { ...prev, [name]: name === "active" ? value === "true" : value } : prev);
  };

  const handleSave = () => {
    // Gọi API để lưu thay đổi nếu có
    console.log("Saved teacher:", teacher);
    setIsEditing(false);
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 flex flex-col items-center relative">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 flex flex-col gap-6">
        {/* Header với tên và nút Sửa/Hủy */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={teacher.name}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-2xl font-bold w-full"
              />
            ) : (
              teacher.name
            )}
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {isEditing ? "Hủy" : "Sửa"}
          </button>
        </div>

        {/* Thông tin giảng viên */}
        <div className="flex flex-col gap-4 text-gray-700 text-lg">
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span>{teacher.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={teacher.email}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg w-full"
              />
            ) : (
              <span>{teacher.email}</span>
            )}
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Môn học:</span>
            {isEditing ? (
              <select
                name="subject"
                value={teacher.subject}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg w-full"
              >
                <option value="Toán">Toán</option>
                <option value="Lý">Lý</option>
                <option value="Hóa">Hóa</option>
                <option value="Văn">Văn</option>
              </select>
            ) : (
              <span>{teacher.subject}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Trạng thái:</span>
            {isEditing ? (
              <select
                name="active"
                value={teacher.active.toString()}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg w-full"
              >
                <option value="true">Hoạt động</option>
                <option value="false">Không còn hoạt động</option>
              </select>
            ) : (
              <span
                className={`px-4 py-2 rounded-full text-white text-base font-semibold ${
                  teacher.active ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {teacher.active ? "Hoạt động" : "Không còn hoạt động"}
              </span>
            )}
          </div>
        </div>

        {/* Nút Lưu khi đang chỉnh sửa */}
        {isEditing && (
          <div className="flex gap-6 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition"
            >
              Lưu
            </button>
          </div>
        )}

        {/* Nút Quay lại danh sách */}
        <button
          onClick={() => router.push("/admin/teachers")}
          className="mt-8 self-center px-8 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition font-semibold text-lg"
        >
          ← Quay lại danh sách
        </button>
      </div>
    </main>
  );
}
