"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Subject {
  id: number;
  name: string;
  code: string;
  credit: number;
}

const EditSubjectPage = () => {
  const { id } = useParams();
  const router = useRouter();

  // Demo data (sau này thay bằng API)
  const mockData: Subject[] = [
    { id: 1, name: "Lập trình Web", code: "WEB101", credit: 3 },
    { id: 2, name: "Cơ sở dữ liệu", code: "DB101", credit: 3 },
    { id: 3, name: "Phân tích thiết kế", code: "SYS201", credit: 4 },
  ];

  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const found = mockData.find((s) => s.id === Number(id));
    setSubject(found || null);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã lưu thay đổi (demo)");
    router.push("/admin/subjects");
  };

  if (!subject) {
    return (
      <div className="p-6 text-center text-gray-500">
        Môn học không tồn tại.
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-6 w-full max-w-xl rounded-2xl shadow-lg border">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Sửa môn học
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Tên môn học</label>
            <input
              type="text"
              value={subject.name}
              onChange={(e) =>
                setSubject({ ...subject, name: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="font-medium">Mã môn</label>
            <input
              type="text"
              value={subject.code}
              onChange={(e) =>
                setSubject({ ...subject, code: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="font-medium">Số tín chỉ</label>
            <input
              type="number"
              value={subject.credit}
              onChange={(e) =>
                setSubject({
                  ...subject,
                  credit: Number(e.target.value),
                })
              }
              className="w-full p-2 mt-1 border rounded-lg"
              min={1}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.push("/admin/subjects")}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
