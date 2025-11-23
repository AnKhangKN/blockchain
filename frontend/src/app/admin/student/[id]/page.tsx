"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as SubjectServices from "@/services/admin/SubjectServices";
import * as ClassServices from "@/services/admin/ClassServices";
import * as ValidateToken from "@/utils/token.utils";
import * as UserServices from "@/services/admin/UserServices";

interface ClassType {
  _id: string;
  className: string;
  classCode: string;
}

interface SubjectType {
  _id: string;
  name: string;
}

interface Student {
  userId: string;
  name: string;
  email: string;
  classes: ClassType[];
  classId: string;
  className: string;
  subjects: SubjectType[];
  status: boolean;
}

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [allClasses, setAllClasses] = useState<ClassType[]>([]);
  const [allSubjects, setAllSubjects] = useState<SubjectType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();

        const classesRes = await ClassServices.getClasses(accessToken);
        const subjectsRes = await SubjectServices.getSubjects(accessToken);
        const userRes = await UserServices.getUserDetail(accessToken, id);

        const userData = userRes.data;

        setStudent({
          userId: id!,
          name: userData.fullName || "",
          email: userData.email || "",
          classes: userData.classes || [],
          classId: userData.classId || (classesRes.data.data[0]?._id ?? ""),
          className:
            userData.className || (classesRes.data.data[0]?.className ?? ""),
          subjects: userData.subjects || [],
          status: userData.status ?? false,
        });

        setAllClasses(classesRes.data.data || []);
        setAllSubjects(subjectsRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const toggleSubject = (subject: SubjectType) => {
    if (!student) return;
    const exists = student.subjects.some((s) => s._id === subject._id);
    setStudent({
      ...student,
      subjects: exists
        ? student.subjects.filter((s) => s._id !== subject._id)
        : [...student.subjects, subject],
    });
  };

  const handleSave = async () => {
    if (!student) return;

    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      console.log(student.subjects.map((s) => s._id));

      await UserServices.updateStudent(accessToken, student.userId, {
        fullName: student.name,
        email: student.email,
        classId: student.classId,
        subjects: student.subjects.map((s) => s._id),
        status: student.status,
      });
      setIsEditing(false);
      alert("✔ Đã lưu thay đổi");
    } catch (err) {
      console.error(err);
      alert("❌ Lưu thất bại");
    }
  };

  if (!student) return <p className="p-6">Đang tải dữ liệu...</p>;

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
          🎓 Thông tin sinh viên
        </h1>

        {/* Form chỉnh sửa */}
        {isEditing ? (
          <div className="space-y-6 text-lg">
            {/* Tên */}
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

            {/* Email */}
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

            {/* Lớp học */}
            <div>
              <label className="font-semibold text-gray-700">Lớp học</label>
              <select
                className="border p-3 rounded w-full mt-1 focus:ring-2 focus:ring-blue-500"
                value={student.classId}
                onChange={(e) => {
                  const selectedClass = allClasses.find(
                    (c) => c._id === e.target.value
                  );
                  if (selectedClass) {
                    setStudent({
                      ...student,
                      classId: selectedClass._id,
                      className: selectedClass.className,
                    });
                  } else {
                    setStudent({ ...student, classId: "", className: "" });
                  }
                }}
              >
                <option value="">-- Chọn lớp --</option>
                {allClasses.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>

            {/* Môn học */}
            <div>
              <label className="font-semibold text-gray-700">Môn học</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {allSubjects.map((sub) => (
                  <label key={sub._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={student.subjects.some((s) => s._id === sub._id)}
                      onChange={() => toggleSubject(sub)}
                    />
                    {sub.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Trạng thái */}
            <div>
              <label className="font-semibold text-gray-700">Trạng thái</label>
              <select
                className="border p-3 rounded w-full mt-1 focus:ring-2 focus:ring-blue-500"
                value={student.status ? "1" : "0"}
                onChange={(e) =>
                  setStudent({ ...student, status: e.target.value === "1" })
                }
              >
                <option value="1">Đang học</option>
                <option value="0">Đã nghỉ</option>
              </select>
            </div>
          </div>
        ) : (
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
              <p className="font-semibold text-gray-700">Lớp học:</p>
              <p className="px-3 inline-block py-1 bg-purple-600 text-white rounded-full text-sm">
                {student.classes.map((cls) => (
                  <span
                    key={cls._id}
                    className="px-3 py-1 text-white rounded-full text-sm"
                  >
                    {cls.classCode}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Môn học:</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {student.subjects.map((sub) => (
                  <span
                    key={sub._id}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-700">Trạng thái:</p>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                  student.status ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {student.status ? "Đang học" : "Đã nghỉ"}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
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

        {/* Popup xác nhận xóa */}
        {showDeleteConfirm && (
          <div className="mt-8 border rounded-xl bg-red-50 p-5 text-center shadow">
            <p className="font-semibold text-red-700 mb-4">
              Bạn có chắc muốn xóa sinh viên này?
            </p>

            <div className="flex justify-center gap-4">
              <button
                // onClick={handleDelete}
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
