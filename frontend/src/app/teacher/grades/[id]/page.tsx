"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const mockData = [
  {
    _id: "1",
    student: "Nguyễn Văn A",
    subject: "Lập trình Web",
    mid: 7.5,
    final: 8.0,
    total: 7.8,
  },
  {
    _id: "2",
    student: "Trần Thị B",
    subject: "Cơ sở dữ liệu",
    mid: 6.5,
    final: 7.0,
    total: 6.8,
  },
  {
    _id: "3",
    student: "Phạm Văn C",
    subject: "Mạng máy tính",
    mid: 8.0,
    final: 8.5,
    total: 8.3,
  },
];

export default function GradeDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const data = mockData.find((item) => item._id === id);

  // 🔥 Hooks phải luôn nằm TRƯỚC return có điều kiện
  const [mid, setMid] = useState(data?.mid ?? 0);
  const [finalScore, setFinalScore] = useState(data?.final ?? 0);

  // ❗ CHECK sau khi dùng hook
  if (!data) {
    return <div className="p-6">Không tìm thấy dữ liệu.</div>;
  }

  const handleSave = () => {
    alert("Đã lưu điểm (demo)");
  };

  const handleDelete = () => {
    const ok = confirm("Bạn có chắc muốn xóa điểm này?");
    if (ok) {
      alert("Đã xóa (demo)");
      router.push("/teacher/grades");
    }
  };

  return (
    <div className="p-6 space-y-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Chi tiết điểm sinh viên</h1>

      <div className="bg-white rounded-xl shadow p-6 border space-y-4 w-full max-w-3xl">
        <p>
          <strong>Sinh viên:</strong> {data.student}
        </p>
        <p>
          <strong>Môn học:</strong> {data.subject}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="font-semibold">Điểm giữa kỳ</label>
            <input
              type="number"
              value={mid}
              onChange={(e) => setMid(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Điểm cuối kỳ</label>
            <input
              type="number"
              value={finalScore}
              onChange={(e) => setFinalScore(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-lg mt-1"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6 justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lưu điểm
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>

      <button
        onClick={() => router.push("/teacher/grades")}
        className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        ← Quay lại
      </button>
    </div>
  );
}
