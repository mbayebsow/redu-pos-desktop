import { ReactNode } from "react";

interface TableProps {
  columns: {
    title: string;
    dataIndex: string;
    render?: string;
  }[];
  data: any[];
  children?: ReactNode;
  handleClick?: (p: any) => void;
}

function Table({ columns, data, children, handleClick }: TableProps) {
  return (
    <div className="relative overflow-x-auto w-full border border-primary-light rounded-xl">
      <table className="w-full relative text-left">
        <thead className="uppercase w-full bg-primary-50 border-b border-b-primary-light">
          <tr>
            {columns.map((column, i) => (
              <th key={i} className="px-6 py-3 opacity-50 w-auto font-normal">
                {column.title}
              </th>
            ))}
            {children && <th scope="col" className="px-6 py-3"></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr
              onClick={() => handleClick && handleClick(d)}
              key={i}
              className={`bg-primary-50  border-b border-b-primary-light hover:bg-primary-100 cursor-pointer`}
            >
              {columns.map((column, i) => (
                <th key={i} className="px-6 py-4 w-auto font-normal">
                  {column.render === "image" ? (
                    <img src={d[column.dataIndex]} className="w-10 aspect-square rounded-md" />
                  ) : d[column.dataIndex].toString() === "false" ? (
                    "Non"
                  ) : d[column.dataIndex].toString() === "true" ? (
                    "Oui"
                  ) : (
                    d[column.dataIndex].toString()
                  )}
                </th>
              ))}
              {children && <th className="px-6 py-4 w-full inline-flex items-center justify-end gap-2">{children}</th>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
