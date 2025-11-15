"use client";

import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function TableComponent<T extends object>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 text-left text-sm font-semibold border-b ${col.className}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}

          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors border-b"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-sm">
                  {String(row[col.key] ?? "--")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
