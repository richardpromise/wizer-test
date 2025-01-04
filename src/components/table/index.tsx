import { FC } from "react";
import { flexRender } from "@tanstack/react-table";
import { ITable } from "../../interface/table";
// import empty from "assets/images/Empty State1.svg";

interface CustomTableProps extends ITable {
  rowBackgroundColor?: string;
  name?: string;
}

const CustomTable: FC<CustomTableProps> = ({
  table,
  data,
  noScroll = false,
  addRowStyle,
  rowBackgroundColor = "bg-white",
  name,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={`border-spacing-y-table w-full min-w-full table-auto rounded-md ${
          noScroll ? "" : "overflow-x-scroll"
        }`}
      >
        <thead className="bg-white top-0 bottom-0 text-left z-[4] w-full border">
          {table &&
            table.getHeaderGroups().map((headerGroup, i) => (
              <tr key={headerGroup.id + i}>
                {headerGroup.headers.map((header, j) => (
                  <th
                    className="capitalize text-gray-500 font-normal text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4"
                    key={header.id + j}
                  >
                    <div
                      {...{
                        className: `${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`,
                      }}
                    >
                      <span className="text-xs sm:text-sm">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
        </thead>
        <tbody className={rowBackgroundColor}>
          {data && data.length > 0 ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id + i}
                className="text-gray-900 text-sm sm:text-base font-normal"
                style={{ ...addRowStyle?.(row.original) }}
              >
                {row.getVisibleCells().map((cell, j) => (
                  <td
                    key={cell.id + j}
                    className="py-2 sm:py-3 border-b border-gray-300 px-2 sm:px-4"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getHeaderGroups()[0].headers.length}>
                <div className="text-center py-6 text-gray-500 grid items-center justify-center">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">
                    No {name} added yet
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
