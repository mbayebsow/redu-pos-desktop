import { memo, useState } from "react";
import { TableColumns } from "../../utils/types";

interface TableProps {
  columns: TableColumns;
  data: any[];
  handleClick?: (p: any) => void;
}

function Table({ columns, data, handleClick }: TableProps) {
  const [activeRow, setActiveRow] = useState<number>();
  return (
    <div className="relative">
      <table className="w-full text-left table-auto">
        <thead className="w-full sticky top-0 z-20 bg-white">
          <tr className=" bg-primary-100/50 shadow-sm">
            {columns.map((column, i) => (
              <th key={i} className="px-2 py-2 w-auto font-normal whitespace-nowrap text-primary-400">
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
              className={`${activeRow === i && "bg-primary-100"} ${handleClick && "cursor-pointer"} border-b border-b-gray-100 hover:bg-white`}
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

export default memo(Table);
