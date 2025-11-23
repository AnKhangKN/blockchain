"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as ValidateToken from "@/utils/token.utils";
import * as ClassServices from "@/services/admin/ClassServices";

const AddClassPage = () => {
  const router = useRouter();

  const [className, setName] = useState("");
  const [classCode, setCode] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!className || !classCode) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      await ClassServices.createClass(
        {
          className,
          classCode,
        },
        accessToken
      );

      alert("Thêm lớp học thành công!");
      router.push("/admin/class");
    } catch (error) {
      console.log("Lỗi thêm lớp học:", error);
      alert("Thêm thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg border w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Thêm lớp học</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên lớp */}
          <div>
            <label className="block font-medium mb-1">Tên lớp</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="VD: Lớp CNTT1"
            />
          </div>

          {/* Mã lớp */}
          <div>
            <label className="block font-medium mb-1">Mã lớp</label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="VD: CNTT101"
            />
          </div>

          {/* Nút thêm lớp */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thêm lớp học
          </button>

          {/* Nút quay lại */}
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Quay lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClassPage;
