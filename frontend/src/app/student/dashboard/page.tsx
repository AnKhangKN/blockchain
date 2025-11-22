"use client";

import React from "react";

// Demo data
const studentProfile = {
  name: "Nguyễn Văn Sinh",
  email: "sinh@example.edu",
  studentId: "SV2023001",
  avatar: "https://i.pravatar.cc/150?img=15",
  major: "Công nghệ thông tin",
};

const enrolledCourses = [
  { id: 1, code: "WEB101", name: "Lập trình Web", credits: 3, status: "Đang học" },
  { id: 2, code: "DB101", name: "Cơ sở dữ liệu", credits: 3, status: "Đang học" },
  { id: 3, code: "NET201", name: "Mạng máy tính", credits: 3, status: "Đã hoàn thành" },
];

const grades = [
  { course: "Lập trình Web", mid: 7.5, final: 8.0, total: 7.8 },
  { course: "Cơ sở dữ liệu", mid: 6.5, final: 7.0, total: 6.8 },
  { course: "Mạng máy tính", mid: 8.0, final: 8.5, total: 8.3 },
];

export default function StudentDashboardPage() {
  const totalCredits = enrolledCourses.reduce((s, c) => s + c.credits, 0);
  const gpaApprox =
    grades.length > 0
      ? (grades.reduce((s, g) => s + g.total, 0) / grades.length).toFixed(2)
      : "-";

  return (
    <main className="p-8 bg-gradient-to-b from-slate-100 to-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER (centered) */}
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

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <section className="space-y-8">

            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition">
              <div className="flex items-center gap-5">
                <img
                  src={studentProfile.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full shadow-md border"
                />
                <div>
                  <h2 className="text-2xl font-semibold">{studentProfile.name}</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {studentProfile.studentId} · {studentProfile.major}
                  </p>
                  <p className="text-slate-500 text-sm">{studentProfile.email}</p>
                </div>
              </div>
            </div>

            {/* ENROLLED COURSES */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Môn học đã đăng ký</h3>
                <span className="text-sm text-slate-500">
                  {enrolledCourses.length} môn
                </span>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 border rounded-xl bg-slate-50 hover:bg-slate-100 transition flex justify-between items-center shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{c.name}</p>
                      <p className="text-sm text-slate-500">
                        {c.code} · {c.credits} tín chỉ
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold text-white ${
                        c.status === "Đang học" ? "bg-green-600" : "bg-gray-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* RIGHT COLUMN */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition">

              <h3 className="text-xl font-bold mb-6">Bảng điểm</h3>

              <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-3 text-left">Môn</th>
                      <th className="p-3 text-center">Giữa kỳ</th>
                      <th className="p-3 text-center">Cuối kỳ</th>
                      <th className="p-3 text-center">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g, idx) => (
                      <tr
                        key={idx}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-3">{g.course}</td>
                        <td className="p-3 text-center">{g.mid}</td>
                        <td className="p-3 text-center">{g.final}</td>
                        <td className="p-3 text-center font-semibold text-blue-700">
                          {g.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SUMMARY */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-5 rounded-xl bg-slate-50 border text-center">
                  <p className="text-slate-500 text-sm">Tổng tín chỉ</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {totalCredits}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-blue-50 border text-center">
                  <p className="text-blue-700 text-sm">Điểm trung bình</p>
                  <p className="text-3xl font-bold text-blue-700 mt-1">
                    {gpaApprox}
                  </p>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
