"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import ScoreManagerABI from "@/blockchain/artifacts/contracts/ScoreManager.sol/ScoreManager.json";

interface Student {
  _id: string;
  email: string;
}

interface Subject {
  _id: string;
  name: string;
}

interface Teacher {
  _id: string;
  email: string;
  subjects: Subject[];
}

/* ---------------- MOCK DATA ---------------- */

const mockStudents: Student[] = [
  { _id: "1", email: "student1@example.com" },
  { _id: "2", email: "student2@example.com" },
];

const mockTeachers: Teacher[] = [
  {
    _id: "t1",
    email: "teacher1@example.com",
    subjects: [
      { _id: "sub1", name: "Math" },
      { _id: "sub2", name: "Physics" },
    ],
  },
];

/* ---- Contract trên testnet đã deploy ---- */
const CONTRACT_ADDRESS = "0xE7DB30Bb2dCAFb1b7cA9afa0618b8156f7575AeA";

/* ---------------- COMPONENT ---------------- */

export default function AddGradePage() {
  const router = useRouter();
  const students = mockStudents;
  const teachers = mockTeachers;

  const [form, setForm] = useState({
    studentId: "",
    teacherId: "",
    subjectId: "",
    score: "",
  });

  /* ---- Gửi điểm lên Smart Contract ---- */
  const handleSave = async () => {
    if (!window.ethereum) return alert("Bạn cần cài MetaMask!");

    const { studentId, subjectId, score } = form;
    if (!studentId || !subjectId || !score)
      return alert("Điền đầy đủ thông tin!");

    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ScoreManagerABI.abi,
        signer
      );

      const tx = await contract.setScore(
        studentId, // string
        subjectId, // string
        Number(score) // uint256
      );

      await tx.wait();

      alert("Thêm điểm thành công!\nTx Hash: " + tx.hash);
    } catch (err) {
      console.error(err);
      alert("Gặp lỗi khi lưu điểm lên blockchain!");
    }
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Thêm điểm mới</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5">
        {/* Chọn sinh viên */}
        <div>
          <label className="font-medium">Sinh viên</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={form.studentId}
            onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          >
            <option value="">Chọn sinh viên…</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.email}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn giảng viên */}
        <div>
          <label className="font-medium">Giảng viên</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={form.teacherId}
            onChange={(e) =>
              setForm({ ...form, teacherId: e.target.value, subjectId: "" })
            }
          >
            <option value="">Chọn giảng viên…</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.email}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn môn học */}
        {form.teacherId && (
          <div>
            <label className="font-medium">Môn học</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={form.subjectId}
              onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
            >
              <option value="">Chọn môn học…</option>
              {teachers
                .find((t) => t._id === form.teacherId)
                ?.subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Nhập điểm */}
        <div>
          <label className="font-medium">Điểm</label>
          <input
            type="number"
            className="w-full border p-2 rounded mt-1"
            placeholder="Nhập điểm…"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Thêm điểm
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          ← Quay lại
        </button>
      </div>
    </main>
  );
}
