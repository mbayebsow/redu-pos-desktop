import { memo, useState } from "react";
import { TableColumns } from "../../utils/types";
import { playBeep } from "../../utils/interactive-sound";
import useTheme from "../../stores/theme";

interface TableProps {
  columns: TableColumns;
  data: any[];
  handleClick?: (p: any) => void;
}

function Table({ columns, data, handleClick }: TableProps) {
  const { activeTheme } = useTheme();
  const [activeRow, setActiveRow] = useState<number>();
  return (
    <div className="relative">
      <table className="w-full text-left table-auto">
        <thead className="w-full sticky top-0">
          <tr style={{ backgroundColor: activeTheme[50], color: activeTheme[400] }} className="shadow-sm [&>*:last-child]:text-right">
            {columns.map((column, i) => (
              <th key={i} className="px-2 py-2 w-auto font-normal whitespace-nowrap">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((d, index) => (
            <tr
              key={index}
              style={{ backgroundColor: activeRow === index ? activeTheme[50] : "" }}
              className={`[&>*:last-child]:text-right border-b border-b-black/5 hover:shadow hover:bg-white`}
            >
              {columns.map((column, i) => (
                <th
                  key={i}
                  onClick={() => {
                    if (handleClick && columns.length !== i + 1) {
                      playBeep();
                      handleClick(d);
                      setActiveRow(index);
                    }
                  }}
                  className="px-2 py-2 w-auto font-normal"
                  style={{ cursor: columns.length !== i + 1 ? "pointer" : "default" }}
                >
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
