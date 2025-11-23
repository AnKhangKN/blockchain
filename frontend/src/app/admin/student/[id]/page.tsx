"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Danh sách môn học demo
  const allSubjects = ["Toán", "Lập trình", "Marketing", "Luật", "Kinh tế", "AI"];

  // Danh sách lớp demo
  const allClasses = ["CT101", "CT102", "CT103", "CT104", "CT105"];

  // Sinh viên học nhiều môn (demo)
  const [student, setStudent] = useState({
    id,
    name: `Sinh viên ${id}`,
    email: `student${id}@school.edu`,
    subjects: ["Toán", "AI"], // nhiều môn
    className: "CT101", // 🆕 thêm lớp
    active: Number(id) % 3 !== 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleSubject = (subject: string) => {
    setStudent((prev: any) => {
      const exists = prev.subjects.includes(subject);
      return {
        ...prev,
        subjects: exists
          ? prev.subjects.filter((s: string) => s !== subject)
          : [...prev.subjects, subject],
      };
    });
  };

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
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
          🎓 Thông tin sinh viên #{id}
        </h1>

        {/* NỘI DUNG */}
        {isEditing ? (
          <div className="space-y-6 text-lg">

            {/* TÊN */}
            <div>
              <label className="font-semibold text-gray-700">Tên</label>
              <input
                className="border rounded p-3 w-full mt-1 focus:ring-2 focus:ring-blue-500"
                value={student.name}
                onChange={(e) =>
                  setStudent({ ...student, name: e.target.value })
                }
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                className="border rounded p-3 w-full mt-1 focus:ring-2 focus:ring-blue-500"
                value={student.email}
                onChange={(e) =>
                  setStudent({ ...student, email: e.target.value })
                }
              />
            </div>

            {/* LỚP HỌC (🆕) */}
            <div>
              <label className="font-semibold text-gray-700">Lớp học</label>
              <select
                className="border p-3 rounded w-full mt-1 focus:ring-2 focus:ring-blue-500"
                value={student.className}
                onChange={(e) =>
                  setStudent({ ...student, className: e.target.value })
                }
              >
                {allClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* MÔN HỌC (multi-select) */}
            <div>
              <label className="font-semibold text-gray-700">Môn học</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {allSubjects.map((sub) => (
                  <label key={sub} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={student.subjects.includes(sub)}
                      onChange={() => toggleSubject(sub)}
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </div>

            {/* TRẠNG THÁI */}
            <div>
              <label className="font-semibold text-gray-700">Trạng thái</label>
              <select
                className="border p-3 rounded w-full mt-1 focus:ring-2 focus:ring-blue-500"
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

            {/* HIỂN THỊ LỚP HỌC (🆕) */}
            <div>
              <p className="font-semibold text-gray-700">Lớp học:</p>
              <p className="px-3 inline-block py-1 bg-purple-600 text-white rounded-full text-sm">
                {student.className}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Môn học:</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {student.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
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
            href="/admin/student"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            ← Quay lại
          </Link>

          <div className="flex gap-3">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                ✔ Lưu
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                ✏️ Sửa
              </button>
            )}

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Xóa
            </button>
          </div>
        </div>

        {/* POPUP XOÁ */}
        {showDeleteConfirm && (
          <div className="mt-8 border rounded-xl bg-red-50 p-5 text-center shadow">
            <p className="font-semibold text-red-700 mb-4">
              Bạn có chắc muốn xóa sinh viên này?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Xóa
              </button>

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
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
