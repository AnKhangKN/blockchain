"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Dummy dữ liệu tạm
const dummySubjects = {
  1: {
    subject: "Lập trình Web",
    credits: 3,
    status: "Đang diễn ra",
    students: [
      { id: 1, name: "Nguyễn Văn A", mid: 7.5, final: 8.0, total: 7.8 },
      { id: 2, name: "Trần Thị B", mid: 6.5, final: 7.0, total: 6.8 },
    ],
  },
  2: {
    subject: "Cơ sở dữ liệu",
    credits: 4,
    status: "Đã kết thúc",
    students: [
      { id: 3, name: "Phạm Văn C", mid: 8.0, final: 8.5, total: 8.3 },
    ],
  },
  3: {
    subject: "Mạng máy tính",
    credits: 3,
    status: "Đang diễn ra",
    students: [
      { id: 4, name: "Lê Văn D", mid: 7.0, final: 7.5, total: 7.3 },
    ],
  },
};

export default function SubjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    setDetail(dummySubjects[id as unknown as keyof typeof dummySubjects]);
  }, [id]);

  if (!detail) {
    return <div className="p-6 text-gray-600">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 space-y-8">

      {/* Header + nút thêm điểm */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Chi tiết môn học: {detail.subject}
        </h1>

        <button
          onClick={() => router.push(`/teacher/grades/subject/${id}/new`)}
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
        >
          + Thêm điểm mới
        </button>
      </div>

      {/* Thông tin môn */}
      <div className="bg-white p-6 rounded-2xl shadow border space-y-2">
        <p className="text-lg">
          <strong>Số tín chỉ:</strong> {detail.credits}
        </p>
        <p className="text-lg">
          <strong>Trạng thái:</strong>{" "}
          <span
            className={
              detail.status === "Đang diễn ra"
                ? "text-green-600 font-semibold"
                : "text-gray-600 font-semibold"
            }
          >
            {detail.status}
          </span>
        </p>
      </div>

      {/* Danh sách điểm */}
      <div className="bg-white rounded-2xl shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-4">Danh sách điểm sinh viên</h2>

        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Sinh viên</th>
              <th className="p-3 text-center">Giữa kỳ</th>
              <th className="p-3 text-center">Cuối kỳ</th>
              <th className="p-3 text-center">Tổng kết</th>
              <th className="p-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {detail.students.map((st: any) => (
              <tr key={st.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{st.name}</td>
                <td className="p-3 text-center">{st.mid}</td>
                <td className="p-3 text-center">{st.final}</td>
                <td className="p-3 text-center font-semibold text-blue-600">
                  {st.total}
                </td>

                {/* Nút sửa điểm */}
                <td className="p-3 text-center">
                  <button
                    onClick={() =>
                      router.push(`/teacher/grades/subject/${id}/edit/${st.id}`)
                    }
                    className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Sửa
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nút quay lại */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition font-medium"
        >
          ← Quay lại
        </button>
      </div>

    </div>
  );
}
