"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Dummy dữ liệu tạm (keys là string)
const dummySubjects: Record<string, any> = {
  "1": {
    students: [
      { id: 1, name: "Nguyễn Văn A", mid: 7.5, final: 8.0 },
      { id: 2, name: "Trần Thị B", mid: 6.5, final: 7.0 },
    ],
  },
  "2": {
    students: [{ id: 3, name: "Phạm Văn C", mid: 8.0, final: 8.5 }],
  },
  "3": {
    students: [{ id: 4, name: "Lê Văn D", mid: 7.0, final: 7.5 }],
  },
};

export default function EditGradePage() {
  // Lấy params an toàn
  const params = useParams();
  const router = useRouter();

  // Ép về string an toàn (nếu undefined -> "")
  const idRaw = params?.id;
  const studentIdRaw = params?.studentId;
  const id = typeof idRaw === "string" ? idRaw : "";
  const studentId = typeof studentIdRaw === "string" ? studentIdRaw : "";

  const [student, setStudent] = useState<any | null>(null);
  const [mid, setMid] = useState<string>("");
  const [final, setFinal] = useState<string>("");

  useEffect(() => {
    // nếu id hoặc studentId rỗng -> không truy xuất
    if (!id || !studentId) {
      setStudent(null);
      return;
    }

    // Truy xuất bằng key string an toàn
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
      setMid(String(found.mid ?? ""));
      setFinal(String(found.final ?? ""));
    } else {
      setStudent(null);
    }
  }, [id, studentId]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const midNum = Number(mid);
    const finalNum = Number(final);

    if (Number.isNaN(midNum) || Number.isNaN(finalNum)) {
      alert("Vui lòng nhập điểm hợp lệ (số).");
      return;
    }

    const total = ((midNum + finalNum) / 2).toFixed(2);

    console.log("Cập nhật điểm:", {
      subjectId: id,
      studentId,
      mid: midNum,
      final: finalNum,
      total,
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
        {/* Giữa kỳ */}
        <div>
          <label className="font-medium">Điểm giữa kỳ</label>
          <input
            type="number"
            step="0.1"
            value={mid}
            onChange={(e) => setMid(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg"
          />
        </div>

        {/* Cuối kỳ */}
        <div>
          <label className="font-medium">Điểm cuối kỳ</label>
          <input
            type="number"
            step="0.1"
            value={final}
            onChange={(e) => setFinal(e.target.value)}
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

      {/* Nút quay lại */}
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
