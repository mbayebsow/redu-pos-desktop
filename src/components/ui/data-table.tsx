interface TableProps {
  columns: {
    title: string;
    dataIndex?: string;
    render?: (record?: any) => any;
  }[];
  data: any[];
  handleClick?: (p: any) => void;
}

function Table({ columns, data, handleClick }: TableProps) {
  return (
    <div className="relative overflow-x-scroll w-full">
      <table className="w-full relative text-left table-auto">
        <thead className="w-full border-b border-b-primary-light">
          <tr>
            {columns.map((column, i) => (
              <th key={i} className="px-6 py-3 opacity-50 w-auto font-normal whitespace-nowrap">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr
              onClick={() => handleClick && handleClick(d)}
              key={i}
              className={`border-b border-b-primary-light hover:bg-primary-50 cursor-pointer`}
            >
              {columns.map((column, i) => (
                <th key={i} className="px-6 py-4 w-auto font-normal">
                  {column.render
                    ? column.render(d)
                    : column.dataIndex && (
                        <div>
                          {d[column.dataIndex].toString() === "false"
                            ? "Non"
                            : d[column.dataIndex].toString() === "true"
                              ? "Oui"
                              : d[column.dataIndex].toString()}
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
