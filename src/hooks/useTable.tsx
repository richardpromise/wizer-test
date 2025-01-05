import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { fuzzyFilter } from "../helpers/table";

interface ITable {
  visibleFields?: any[];
  tableData: any[];
  search?: string;
  columnVisibility?: any;
  isVisibleFieldsMapped?: boolean;
  mappedVisibleFields?: ColumnDef<any>[];
}

const useTable = ({
  visibleFields = [],
  tableData = [],
  columnVisibility = {},
  search = "",
  isVisibleFieldsMapped = false,
  mappedVisibleFields = [],
}: ITable) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const visibleFieldsMapping = useMemo(() => {
    if (!visibleFields) return { columns: [], columnVisibility: {} };

    return isVisibleFieldsMapped
      ? { columns: mappedVisibleFields || [] }
      : visibleFields.reduce(
          (acc: any, item) => {
            const column = {
              accessorKey: item.name,
              enableSorting: item.sortable ?? true,
              cell:
                item.name === "s/n"
                  ? (prop: any) => prop.row.index + 1
                  : item?.customCell ??
                    ((info: any) => (
                      <span className="break-all">
                        {info.getValue() || "N/A"}
                      </span>
                    )),
              header: () =>
                item.Header ?? <span className="capitalize">{item.as}</span>,
              ...item?.style,
            };

            acc.columns.push(column);
            acc.columnVisibility[item.name] = item.show;
            return acc;
          },
          { columns: [], columnVisibility: {} }
        );
  }, [isVisibleFieldsMapped, mappedVisibleFields, visibleFields]);

  const table = useReactTable({
    data: tableData,
    columns: visibleFieldsMapping?.columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter: search,
      columnVisibility:
        columnVisibility ?? visibleFieldsMapping?.columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    table,
    data: tableData,
  };
};

export default useTable;
