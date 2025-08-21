import  { useState } from "react";

export type Column<T> = {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const toggleRow = (index: number) => {
    const updated = new Set(selectedRows);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setSelectedRows(updated);
    if (onRowSelect) {
      onRowSelect(Array.from(updated).map((i) => data[i]));
    }
  };

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string") {
      return sortAsc
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number") {
      return sortAsc ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto border rounded-md">
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-center p-4 text-gray-500">No data available</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {selectable && <th className="p-2"></th>}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left p-2 cursor-pointer select-none"
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  {col.title}
                  {sortKey === col.key && (sortAsc ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b hover:bg-gray-50 ${
                  selectedRows.has(idx) ? "bg-blue-50" : ""
                }`}
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(idx)}
                      onChange={() => toggleRow(idx)}
                      aria-label={`Select row ${idx}`}

                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-2">
                    {row[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}




export type { Column };
