"use client";

import ButtonComponent from "@/components/teacher/ButtonComponent/ButtonComponent";
import { TableComponent } from "@/components/teacher/TableComponent/TableComponent";
import { useRouter } from "next/navigation";
import React from "react";

const Students = () => {
  interface Student {
    id: number;
    name: string;
    email: string;
    major: string;
  }

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên sinh viên" },
    { key: "email", label: "Email" },
    { key: "major", label: "Ngành" },
  ] satisfies { key: keyof Student; label: string }[];

  const data: Student[] = [
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", major: "CNTT" },
    { id: 2, name: "Trần Thị B", email: "b@gmail.com", major: "Kinh tế" },
  ];

  const router = useRouter();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div>Quản lý sinh viên</div>
        <ButtonComponent onClick={() => router.push("/teacher/students/add")}>
          Thêm sinh viên mới
        </ButtonComponent>
      </div>

      <div className="border border-gray-200 mt-4">
        <TableComponent<Student> columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Students;
