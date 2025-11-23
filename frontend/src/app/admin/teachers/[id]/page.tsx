"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as ValidateToken from "@/utils/token.utils";
import * as UserServices from "@/services/admin/UserServices";
import * as SubjectServices from "@/services/admin/SubjectServices";

interface Teacher {
  _id: string;
  email: string;
  isTeacher: boolean;
  isAdmin: boolean;
  status: "active" | "inactive";
  subjects: string[];
  createdAt: string;
}

interface Subject {
  _id: string;
  name: string;
}

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // ================================
  // FETCH GIẢNG VIÊN + MÔN HỌC
  // ================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();

        // Lấy thông tin giảng viên
        const userRes = await UserServices.getUserDetail(
          accessToken,
          String(params.id)
        );
        setTeacher(userRes.data);

        // Lấy danh sách môn học
        const subjectRes = await SubjectServices.getSubjects(accessToken);
        setSubjectList(subjectRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [params.id]);

  if (!teacher)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-semibold">
          Không tìm thấy giảng viên.
        </p>
      </div>
    );

  // ================================
  // HANDLE INPUT CHANGE
  // ================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setTeacher((prev) =>
      prev
        ? {
            ...prev,
            [name]: value, // GIỮ ĐÚNG STRING "active"/"inactive"
          }
        : prev
    );
  };

  const handleCheckboxSubject = (subjectId: string, checked: boolean) => {
    setTeacher((prev) =>
      prev
        ? {
            ...prev,
            subjects: checked
              ? [...prev.subjects, subjectId]
              : prev.subjects.filter((id) => id !== subjectId),
          }
        : prev
    );
  };

  // ================================
  // SAVE TEACHER
  // ================================
  const handleSave = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      const role = teacher?.isAdmin
        ? "admin"
        : teacher?.isTeacher
        ? "teacher"
        : "student";

      await UserServices.updateUserRole(accessToken, teacher!._id, {
        role,
        subjects: teacher.subjects,
      });

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const uniqueSubjects = Array.from(
    new Map(teacher.subjects.map((s) => [s._id, s])).values()
  );

  return (
    <main className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex-1">
            {teacher.email.split("@")[0]}
          </h1>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {isEditing ? "Hủy" : "Sửa"}
          </button>
        </div>

        <div className="flex flex-col gap-4 text-gray-700 text-lg">
          {/* ID */}
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span>{teacher._id}</span>
          </div>

          {/* Email */}
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={teacher.email}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg w-full"
              />
            ) : (
              <span>{teacher.email}</span>
            )}
          </div>

          {/* QUYỀN */}
          <div className="flex justify-between">
            <span className="font-semibold">Quyền:</span>

            {isEditing ? (
              <select
                name="role"
                className="px-3 py-2 border rounded-lg w-full"
                value={
                  teacher.isAdmin
                    ? "admin"
                    : teacher.isTeacher
                    ? "teacher"
                    : "student"
                }
                onChange={(e) => {
                  const role = e.target.value;

                  setTeacher((prev) =>
                    prev
                      ? {
                          ...prev,
                          isAdmin: role === "admin",
                          isTeacher: role === "teacher",
                        }
                      : prev
                  );
                }}
              >
                <option value="admin">Admin</option>
                <option value="teacher">Giảng viên</option>
                <option value="student">Sinh viên</option>
              </select>
            ) : (
              <span>
                {teacher.isAdmin
                  ? "Admin"
                  : teacher.isTeacher
                  ? "Giảng viên"
                  : "Sinh viên"}
              </span>
            )}
          </div>

          {/* Môn dạy */}
          <div className="flex flex-col gap-2">
            <span className="font-semibold">
              {teacher.isTeacher ? "Môn dạy:" : "Môn học:"}
            </span>

            {isEditing && teacher.isTeacher ? (
              <div className="grid grid-cols-2 gap-2">
                {subjectList.map((subject) => (
                  <label key={subject._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={teacher.subjects.includes(subject._id)}
                      onChange={(e) =>
                        handleCheckboxSubject(subject._id, e.target.checked)
                      }
                    />
                    <span>{subject.name}</span>
                  </label>
                ))}
              </div>
            ) : (
              <span>
                {uniqueSubjects.length > 0
                  ? uniqueSubjects.map((sub, index) => (
                      <span key={sub._id}>
                        {sub.name}
                        {index < uniqueSubjects.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "Chưa có môn dạy"}
              </span>
            )}
          </div>

          {/* STATUS */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">Trạng thái:</span>

            {isEditing ? (
              <select
                name="status"
                value={teacher.status}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg w-full"
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không còn hoạt động</option>
              </select>
            ) : (
              <span
                className={`px-4 py-2 rounded-full text-white text-base font-semibold ${
                  teacher.status === "active" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {teacher.status === "active"
                  ? "Hoạt động"
                  : "Không còn hoạt động"}
              </span>
            )}
          </div>
        </div>

        {/* BUTTON SAVE */}
        {isEditing && (
          <div className="flex gap-6 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition"
            >
              Lưu
            </button>
          </div>
        )}

        <button
          onClick={() => router.push("/admin/teachers")}
          className="mt-8 self-center px-8 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition font-semibold text-lg"
        >
          ← Quay lại danh sách
        </button>
      </div>
    </main>
  );
}
