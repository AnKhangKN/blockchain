"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import ScoreManagerABI from "@/blockchain/artifacts/contracts/ScoreManager.sol/ScoreManager.json";
import * as ValidateToken from "@/utils/token.utils";
import * as UserServices from "@/services/teacher/UserServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getAllScoresSafe } from "@/services/teacher/blockchain";

interface Student {
  _id: string;
  email: string;
}

interface Subject {
  _id: string;
  name: string;
  code: string;
}

interface Score {
  subjectId: string;
  value: number;
}

const CONTRACT_ADDRESS = "0xdDD948966a9f58e75909729d35ed4384C47e9331";

export default function AddGradePage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  // ------------ STATE MỚI TÁCH RIÊNG ------------
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [score, setScore] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [scores, setScores] = useState<Score[]>([]);

  // =========================================================
  //                FETCH STUDENTS THEO MÔN
  // =========================================================
  const fetchStudentsBySubject = async (subjectId: string) => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await UserServices.getStudents(accessToken, subjectId);

      setStudents(res.data || []);
      setSelectedStudent(""); // reset sinh viên
      setScores([]); // reset bảng điểm khi đổi môn
    } catch (err) {
      console.error("Lỗi fetch students:", err);
    }
  };

  // =========================================================
  //                     FETCH SCORES
  // =========================================================
  const fetchScores = async (studentId: string) => {
    if (!window.ethereum) return;

    try {
      const data = await getAllScoresSafe(studentId);

      setScores(data);
    } catch (err) {
      console.error("Lỗi fetch scores:", err);
    }
  };

  // =========================================================
  //               ADD / UPDATE SCORE (BLOCKCHAIN)
  // =========================================================
  const handleAdd = async () => {
    if (!window.ethereum) return alert("Bạn cần cài MetaMask!");

    if (!selectedStudent || !selectedSubjectCode || !score)
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

      await contract.addScore(
        selectedStudent,
        selectedSubjectCode,
        Number(score)
      );

      alert("✔ Thêm điểm thành công!");
      fetchScores(selectedStudent);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi lưu điểm lên blockchain!");
    }
  };

  const handleUpdate = async () => {
    if (!window.ethereum) return alert("Bạn cần cài MetaMask!");

    if (!selectedStudent || !selectedSubjectCode || !score)
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

      await contract.updateScore(
        selectedStudent,
        selectedSubjectCode,
        Number(score)
      );

      alert("✔ Cập nhật điểm thành công!");
      fetchScores(selectedStudent);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi lưu điểm lên blockchain!");
    }
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Thêm/Cập nhật điểm
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5">
        {/* ============ CHỌN MÔN ============ */}
        {user.subjects && user.subjects.length > 0 && (
          <div>
            <label className="font-medium">Môn học</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={selectedSubjectId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedSubjectId(id);

                const subject = user.subjects.find(
                  (x: Subject) => x._id === id
                );
                setSelectedSubjectCode(subject?.code || "");

                fetchStudentsBySubject(id); // BE dùng _id
              }}
            >
              <option value="">Chọn môn học…</option>
              {user.subjects.map((sub: Subject) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ============ CHỌN SINH VIÊN ============ */}
        {students.length > 0 && (
          <div>
            <label className="font-medium">Sinh viên</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={selectedStudent}
              onChange={(e) => {
                const stuId = e.target.value;
                setSelectedStudent(stuId);
                fetchScores(stuId);
              }}
            >
              <option value="">Chọn sinh viên…</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.email}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ============ NHẬP ĐIỂM ============ */}
        <div>
          <label className="font-medium">Điểm</label>
          <input
            type="number"
            className="w-full border p-2 rounded mt-1"
            placeholder="Nhập điểm…"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>

        {/* BUTTON ADD / UPDATE */}
        <button
          onClick={handleAdd}
          className="w-full mt-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Thêm điểm
        </button>

        {/* Cập nhật điểm */}
        <button
          onClick={handleUpdate}
          className="w-full mt-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Cập nhật điểm
        </button>

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          ← Quay lại
        </button>

        {/* ============ BẢNG ĐIỂM ============ */}
        {scores.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Bảng điểm</h2>
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Môn học</th>
                  <th className="p-2 border">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((s) => {
                  return (
                    <tr key={s.subjectId}>
                      <td className="p-2 border">{s.subjectId}</td>
                      <td className="p-2 border">
                        {s.value ? s.value.toString() : s.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
