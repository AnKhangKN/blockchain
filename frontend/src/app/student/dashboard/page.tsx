"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getAllScoresSafe } from "@/services/teacher/blockchain";

interface Grade {
  subjectId: string;
  midterm?: number;
  final?: number;
  value: number; // tổng kết
}

export default function StudentDashboardPage() {
  const user = useSelector((state: RootState) => state.user);
  const studentId = user?.id;

  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  const studentProfile = {
    name: user?.fullName || "Sinh viên",
    email: user?.email || "",
    studentId: studentId || "N/A",
    avatar: "https://i.pravatar.cc/150?img=15",
    major: "Công nghệ thông tin",
  };

  useEffect(() => {
    const fetchGrades = async () => {
      if (!studentId) return;
      setLoading(true);

      try {
        const scores: any = await getAllScoresSafe(studentId);
        console.log("Raw scores from blockchain:", scores);

        setGrades(scores);
      } catch (err) {
        console.error("Lỗi lấy điểm blockchain:", err);
        setGrades([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentId]);

  return (
    <main className="p-8 bg-gradient-to-b from-slate-100 to-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex justify-center items-center text-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Bảng điều khiển sinh viên
            </h1>
            <p className="text-slate-600 mt-1">
              Xin chào, {studentProfile.name}
            </p>
          </div>
        </header>

        {loading ? (
          <p className="text-center text-lg">Đang tải điểm từ blockchain...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT PROFILE */}
            <section className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <div className="flex items-center gap-5">
                  <img
                    src={studentProfile.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full shadow-md border"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {studentProfile.name}
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                      {studentProfile.studentId} · {studentProfile.major}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {studentProfile.email}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT SCORE TABLE */}
            <section className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-xl font-bold mb-6">Bảng điểm</h3>

                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-3 text-left">Môn</th>
                        <th className="p-3 text-center">Tổng kết</th>
                      </tr>
                    </thead>

                    <tbody>
                      {grades.map((g, idx) => (
                        <tr key={idx} className="border-t hover:bg-slate-50">
                          <td className="p-3">{g.subjectId}</td>

                          <td className="p-3 text-center font-semibold">
                            {g.value !== undefined ? g.value : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
