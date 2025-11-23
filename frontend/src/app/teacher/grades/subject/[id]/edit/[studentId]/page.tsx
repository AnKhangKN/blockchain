"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Dummy dữ liệu tạm (keys là string)
const dummySubjects: Record<string, any> = {
  "1": {
    students: [
      { id: 1, name: "Nguyễn Văn A", total: 7.8 },
      { id: 2, name: "Trần Thị B", total: 6.8 },
    ],
  },
  "2": {
    students: [{ id: 3, name: "Phạm Văn C", total: 8.3 }],
  },
  "3": {
    students: [{ id: 4, name: "Lê Văn D", total: 7.3 }],
  },
};

export default function EditGradePage() {
  const params = useParams();
  const router = useRouter();

  const idRaw = params?.id;
  const studentIdRaw = params?.studentId;
  const id = typeof idRaw === "string" ? idRaw : "";
  const studentId = typeof studentIdRaw === "string" ? studentIdRaw : "";

  const [student, setStudent] = useState<any | null>(null);
  const [total, setTotal] = useState<string>("");

  useEffect(() => {
    if (!id || !studentId) {
      setStudent(null);
      return;
    }

    const subject = dummySubjects[id];
    if (!subject) {
      setStudent(null);
      return;
    }

    const found = subject.students.find(
      (s: any) => s.id === Number(studentId)
    );

    if (found) {
      setStudent(found);
      setTotal(String(found.total ?? ""));
    } else {
      setStudent(null);
    }
  }, [id, studentId]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const totalNum = Number(total);

    if (Number.isNaN(totalNum)) {
      alert("Vui lòng nhập điểm hợp lệ (số).");
      return;
    }

    console.log("Cập nhật điểm:", {
      subjectId: id,
      studentId,
      total: totalNum,
    });

    // TODO: Gọi API cập nhật ở đây

    alert("Cập nhật điểm thành công!");
    router.back();
  };

  if (!student) {
    return (
      <div className="p-6 text-gray-600">
        Đang tải dữ liệu hoặc không tìm thấy sinh viên...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Sửa điểm — {student.name}
      </h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-2xl shadow border space-y-4"
      >
        {/* Điểm tổng kết */}
        <div>
          <label className="font-medium">Điểm</label>
          <input
            type="number"
            step="0.1"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-medium"
        >
          Cập nhật
        </button>
      </form>

      <div className="flex justify-center">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
}
