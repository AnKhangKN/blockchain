"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import * as ValidateToken from "@/utils/token.utils";
import * as SubjectServices from "@/services/admin/SubjectServices";

const EditSubjectPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu môn học
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await SubjectServices.getSubjectById(
          accessToken,
          id as string
        );

        const s = res;

        setName(s.name);
        setCode(s.code);
      } catch (error) {
        console.log("Lỗi khi lấy môn học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Update môn học
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      await SubjectServices.updateSubjects(accessToken, id, name, code);

      alert("Cập nhật thành công!");
      router.push("/admin/subjects");
    } catch (error) {
      console.log("Lỗi khi cập nhật môn học:", error);
      alert("Có lỗi xảy ra khi cập nhật.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Đang tải dữ liệu môn học...
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg border w-full max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sửa môn học</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Tên môn</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mã môn</label>
            <input
              type="text"
              value={code}
              required
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Quay lại
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubjectPage;
