"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddGradePage() {
  const { id } = useParams(); // id môn học
  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [mid, setMid] = useState("");
  const [final, setFinal] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const total = ((Number(mid) + Number(final)) / 2).toFixed(2);

    console.log("Gửi dữ liệu:", {
      subjectId: id,
      studentName,
      mid,
      final,
      total,
    });

    // TODO: gọi API để lưu vào backend

    alert("Đã thêm điểm mới!");
    router.back();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Thêm điểm mới</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow border space-y-4"
      >
        {/* Tên sinh viên */}
        <div>
          <label className="font-medium">Tên sinh viên</label>
          <input
            type="text"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Nhập tên sinh viên"
          />
        </div>

        {/* Giữa kỳ */}
        <div>
          <label className="font-medium">Điểm giữa kỳ</label>
          <input
            type="number"
            step="0.1"
            required
            value={mid}
            onChange={(e) => setMid(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="VD: 7.5"
          />
        </div>

        {/* Cuối kỳ */}
        <div>
          <label className="font-medium">Điểm cuối kỳ</label>
          <input
            type="number"
            step="0.1"
            required
            value={final}
            onChange={(e) => setFinal(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="VD: 8.0"
          />
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
        >
          Lưu điểm
        </button>
      </form>

      {/* Nút quay lại */}
      <div className="flex justify-center">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
}
