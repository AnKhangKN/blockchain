"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as ValidateToken from "@/utils/token.utils";
import * as SubjectServices from "@/services/admin/SubjectServices";

const AddSubjectPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      await SubjectServices.addNewSubject(accessToken, name, code);

      alert("Thêm môn học thành công!");
      router.push("/admin/subjects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-5">Thêm môn học mới</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="font-medium">Tên môn học</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-medium">Mã môn</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Lưu lại
        </button>

        {/* Nút quay lại đặt dưới */}
        <button
          type="button"
          onClick={() => router.push("/admin/subjects")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          ⬅ Quay lại
        </button>
      </form>
    </div>
  );
};

export default AddSubjectPage;
