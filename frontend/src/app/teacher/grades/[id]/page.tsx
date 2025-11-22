"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

<<<<<<< HEAD
const mockData = [
  {
    _id: "1",
=======
const dummyGrades: Record<string, any> = {
  "1": {
    id: 1,
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
    student: "Nguyễn Văn A",
    subject: "Lập trình Web",
    mid: 7.5,
    final: 8.0,
    total: 7.8,
  },
<<<<<<< HEAD
  {
    _id: "2",
=======
  "2": {
    id: 2,
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
    student: "Trần Thị B",
    subject: "Cơ sở dữ liệu",
    mid: 6.5,
    final: 7.0,
    total: 6.8,
  },
<<<<<<< HEAD
  {
    _id: "3",
=======
  "3": {
    id: 3,
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
    student: "Phạm Văn C",
    subject: "Mạng máy tính",
    mid: 8.0,
    final: 8.5,
    total: 8.3,
  },
];

export default function GradeDetailPage() {
  const params = useParams();
  const router = useRouter();

<<<<<<< HEAD
  const data = mockData.find((item) => item._id === id);
=======
  // params.id luôn là string => dùng trực tiếp làm key
  const gradeId = params.id as string;

  const data = dummyGrades[gradeId];

  // Nếu không có dữ liệu → hiện thông báo
  if (!data) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ❌ Không tìm thấy dữ liệu điểm.
        <div>
          <button
            onClick={() => router.push("/teacher/grades")}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61

  // 🔥 Hooks phải luôn nằm TRƯỚC return có điều kiện
  const [mid, setMid] = useState(data?.mid ?? 0);
  const [finalScore, setFinalScore] = useState(data?.final ?? 0);

  // ❗ CHECK sau khi dùng hook
  if (!data) {
    return <div className="p-6">Không tìm thấy dữ liệu.</div>;
  }

  const calculateTotal = () => {
    const m = Number(mid) || 0;
    const f = Number(finalScore) || 0;
    return ((m + f * 2) / 3).toFixed(2);
  };

  const handleSave = () => {
    alert("Đã lưu điểm (demo)");
  };

  const handleDelete = () => {
    if (confirm("Bạn có chắc muốn xóa điểm này?")) {
      alert("Đã xóa (demo)");
      router.push("/teacher/grades");
    }
  };

  return (
<<<<<<< HEAD
    <div className="p-6 space-y-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Chi tiết điểm sinh viên</h1>

      <div className="bg-white rounded-xl shadow p-6 border space-y-4 w-full max-w-3xl">
=======
    <main className="p-6 flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Chi tiết điểm sinh viên</h1>

      {/* CARD */}
      <div className="bg-white w-full max-w-3xl p-6 shadow-lg rounded-xl border space-y-4">

>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
        <p>
          <strong>Sinh viên:</strong> {data.student}
        </p>

        <p>
          <strong>Môn học:</strong> {data.subject}
        </p>

<<<<<<< HEAD
        <div className="grid grid-cols-2 gap-4 mt-4">
=======
        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
          <div>
            <label className="font-medium">Điểm giữa kỳ</label>
            <input
              type="number"
              value={mid}
<<<<<<< HEAD
              onChange={(e) => setMid(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-lg mt-1"
=======
              onChange={(e) => setMid(e.target.value)}
              className="w-full border p-2 rounded mt-1"
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
            />
          </div>

          <div>
            <label className="font-medium">Điểm cuối kỳ</label>
            <input
              type="number"
              value={finalScore}
<<<<<<< HEAD
              onChange={(e) => setFinalScore(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-lg mt-1"
=======
              onChange={(e) => setFinalScore(e.target.value)}
              className="w-full border p-2 rounded mt-1"
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
            />
          </div>

        </div>

<<<<<<< HEAD
        <div className="flex gap-4 mt-6 justify-end">
=======
        <p className="text-lg mt-4">
          <strong>Tổng kết:</strong>{" "}
          <span className="text-blue-600 font-semibold">{calculateTotal()}</span>
        </p>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-6">
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lưu điểm
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Xóa
          </button>
        </div>

      </div>

<<<<<<< HEAD
=======
      {/* BACK BUTTON */}
>>>>>>> d29cebf6b822d5b7b3c0aa8befd64a40f6f1af61
      <button
        onClick={() => router.push("/teacher/grades")}
        className="mt-6 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
      >
        ← Quay lại
      </button>
    </main>
  );
}
