"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Toán",
    active: true,
  });

  const handleAdd = () => {
    alert("Thêm sinh viên thành công! (demo)");
    router.push("/teacher/students");
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Thêm sinh viên mới</h1>
      </div>

      {/* FORM CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 border max-w-2xl mx-auto space-y-5">

        <div>
          <label className="font-medium">Tên sinh viên</label>
          <input
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Nhập tên sinh viên..."
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Nhập email..."
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* MÔN HỌC */}
        <div>
          <label className="font-medium">Môn học</label>
          <select
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          >
            <option value="Toán">Toán</option>
            <option value="Lập trình">Lập trình</option>
            <option value="UX/UI">UX/UI</option>
            <option value="Mạng máy tính">Mạng máy tính</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Trạng thái</label>
          <select
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.active ? "1" : "0"}
            onChange={(e) =>
              setFormData({ ...formData, active: e.target.value === "1" })
            }
          >
            <option value="1">Đang học</option>
            <option value="0">Đã nghỉ</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition font-medium"
        >
          + Thêm sinh viên
        </button>
      </div>

      {/* BUTTON QUAY LẠI */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          ← Quay lại
        </button>
      </div>

    </main>
  );
}
