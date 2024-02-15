import { useState } from "react";
import { TableColumns } from "../../lib/types";

interface TableProps {
  columns: TableColumns;
  data: any[];
  handleClick?: (p: any) => void;
}

function Table({ columns, data, handleClick }: TableProps) {
  const [activeRow, setActiveRow] = useState<number>();
  return (
    <div className="relative overflow-x-scroll w-full">
      <table className="w-full relative text-left table-auto">
        <thead className="w-full border-b border-b-primary-light">
          <tr>
            {columns.map((column, i) => (
              <th key={i} className="px-2 py-3 opacity-50 w-auto font-normal whitespace-nowrap">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr
              onClick={() => {
                if (handleClick) {
                  handleClick(d);
                  setActiveRow(i);
                }
              }}
              key={i}
              className={`${activeRow === i && "bg-primary-100"} ${handleClick && "cursor-pointer"} border-b border-b-primary-light hover:bg-primary-50`}
            >
              {columns.map((column, i) => (
                <th key={i} className="px-2 py-2 w-auto font-normal">
                  {column.render
                    ? column.render(d)
                    : column.dataIndex && (
                      <div style={{ width: column.width }}>
                        {d[column.dataIndex]?.toString() === "false"
                          ? "Non"
                          : d[column.dataIndex]?.toString() === "true"
                            ? "Oui"
                            : d[column.dataIndex]?.toString()}
                      </div>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
