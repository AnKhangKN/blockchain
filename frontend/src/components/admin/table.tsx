"use client";

interface TableProps {
  columns: string[];
  data: React.ReactNode[][];
}

export default function Table({ columns, data }: TableProps) {
  return (
    <table className="min-w-full border border-gray-300 rounded">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-4 py-2 border-b">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rIdx) => (
          <tr key={rIdx} className="hover:bg-gray-50">
            {row.map((cell, cIdx) => (
              <td key={cIdx} className="px-4 py-2 border-b">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
