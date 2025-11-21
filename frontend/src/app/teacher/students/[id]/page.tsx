"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Demo student
  const [student, setStudent] = useState({
    id,
    name: `Sinh viên ${id}`,
    email: `student${id}@school.edu`,
    major: ["CNTT", "Kinh tế", "Luật", "Điện tử"][Number(id) % 4],
    active: Number(id) % 3 !== 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("✔ Đã lưu thay đổi (demo)");
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    alert("🗑️ Đã xóa sinh viên (demo)");
    router.push("/teacher/students");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Thông tin sinh viên #{id}
        </h1>

        {/* FORM SỬA */}
        {isEditing ? (
          <div className="space-y-6 text-lg">
            <div>
              <p className="font-semibold text-gray-700">Tên:</p>
              <input
                className="border p-2 rounded w-full"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Email:</p>
              <input
                className="border p-2 rounded w-full"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
              />
            </div>

            <div>
              <p className="font-semibold text-gray-700">Ngành học:</p>
              <select
                className="border p-2 rounded w-full"
                value={student.major}
                onChange={(e) => setStudent({ ...student, major: e.target.value })}
              >
                <option value="CNTT">CNTT</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Luật">Luật</option>
                <option value="Điện tử">Điện tử</option>
              </select>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Trạng thái:</p>
              <select
                className="border p-2 rounded w-full"
                value={student.active ? "1" : "0"}
                onChange={(e) =>
                  setStudent({ ...student, active: e.target.value === "1" })
                }
              >
                <option value="1">Đang học</option>
                <option value="0">Đã nghỉ</option>
              </select>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <div className="space-y-6 text-lg">
            <div>
              <p className="font-semibold text-gray-700">Tên:</p>
              <p>{student.name}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Email:</p>
              <p>{student.email}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Ngành học:</p>
              <p>{student.major}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Trạng thái:</p>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                  student.active ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {student.active ? "Đang học" : "Đã nghỉ"}
              </span>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between items-center mt-10">

          <Link
            href="/teacher/students"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Quay lại danh sách
          </Link>

          <div className="flex gap-3">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                ✔ Lưu
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                ✏️ Sửa
              </button>
            )}

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Xóa
            </button>
          </div>
        </div>

        {/* POPUP XÁC NHẬN XÓA */}
        {showDeleteConfirm && (
          <div className="mt-6 p-4 border rounded-xl bg-red-50 text-center">
            <p className="font-semibold text-red-700 mb-4">
              Bạn có chắc chắn muốn xóa sinh viên này?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
