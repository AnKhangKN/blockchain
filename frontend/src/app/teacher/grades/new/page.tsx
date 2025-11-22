"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGradePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    studentName: "",
    subject: "",
    mid: "",
    finalScore: "",
  });

  const handleSave = () => {
    alert("Đã thêm điểm mới! (demo)");
    router.push("/teacher/grades");
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Thêm điểm mới</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5">

        {/* Tên sinh viên */}
        <div>
          <label className="font-medium">Tên sinh viên</label>
          <input
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Nhập tên sinh viên…"
            value={form.studentName}
            onChange={(e) =>
              setForm({ ...form, studentName: e.target.value })
            }
          />
        </div>

        {/* Môn học — Tự nhập */}
        <div>
          <label className="font-medium">Môn học</label>
          <input
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Nhập môn học…"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
          />
        </div>

        {/* Điểm giữa kỳ */}
        <div>
          <label className="font-medium">Điểm giữa kỳ</label>
          <input
            className="w-full border p-2 rounded mt-1"
            placeholder="Nhập điểm giữa kỳ…"
            value={form.mid}
            onChange={(e) =>
              setForm({ ...form, mid: e.target.value })
            }
          />
        </div>

        {/* Điểm cuối kỳ */}
        <div>
          <label className="font-medium">Điểm cuối kỳ</label>
          <input
            className="w-full border p-2 rounded mt-1"
            placeholder="Nhập điểm cuối kỳ…"
            value={form.finalScore}
            onChange={(e) =>
              setForm({ ...form, finalScore: e.target.value })
            }
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full mt-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition font-medium"
        >
          + Thêm điểm
        </button>

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 shadow-md transition"
        >
          ← Quay lại
        </button>

      </div>
    </main>
  );
}
