"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as ValidateToken from "@/utils/token.utils";
import * as UserServices from "@/services/admin/UserServices";

interface Teacher {
  _id: string;
  email: string;
  isTeacher: boolean;
  isAdmin: boolean;
  status: string;
  subjects: string[];
  createdAt: string;
}

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Lấy dữ liệu chi tiết
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await UserServices.getUserDetail(
          accessToken,
          String(params.id)
        );
        setTeacher(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeacher();
  }, [params.id]);

  if (!teacher)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-semibold">
          Không tìm thấy giảng viên.
        </p>
      </div>
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTeacher((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "active" || name === "status" ? value === "true" : value,
          }
        : prev
    );
  };

  const handleSave = async () => {
    try {
      // TODO: Gọi API để update teacher
      console.log("Saved teacher:", teacher);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 flex flex-col items-center relative">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex-1">
            {isEditing ? (
              <input
                type="text"
                name="email"
                value={teacher.email.split("@")[0]}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg text-2xl font-bold w-full"
              />
            ) : (
              teacher.email.split("@")[0]
            )}
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {isEditing ? "Hủy" : "Sửa"}
          </button>
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex flex-col gap-4 text-gray-700 text-lg">
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span>{teacher._id}</span>
          </div>

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

          <div className="flex justify-between">
            <span className="font-semibold">Môn học:</span>
            {isEditing ? (
              <select
                name="subjects"
                value={teacher.subjects[0] || ""}
                onChange={(e) =>
                  setTeacher((prev) =>
                    prev ? { ...prev, subjects: [e.target.value] } : prev
                  )
                }
                className="px-3 py-2 border rounded-lg w-full"
              >
                <option value="Toán">Toán</option>
                <option value="Lý">Lý</option>
                <option value="Hóa">Hóa</option>
                <option value="Văn">Văn</option>
              </select>
            ) : (
              <span>{teacher.subjects.join(", ") || "Chưa có môn"}</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Trạng thái:</span>
            {isEditing ? (
              <select
                name="status"
                value={teacher.status === "active" ? "true" : "false"}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg w-full"
              >
                <option value="true">Hoạt động</option>
                <option value="false">Không còn hoạt động</option>
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

        {/* Nút Lưu */}
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

        {/* Quay lại danh sách */}
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
