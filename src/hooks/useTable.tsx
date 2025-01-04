import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fuzzyFilter } from "../helpers/table";
import { useMemo, useRef, useState } from "react";

interface ITable {
  visibleFields?: any[];
  tableData: any[];
  search?: string;
  columnVisibility?: any;
  isVisibleFieldsMapped?: boolean;
  mappedVisibleFields?: ColumnDef<any>[];
}

const useTable = ({
  visibleFields,
  tableData,
  columnVisibility,
  search,
  isVisibleFieldsMapped = false,
  mappedVisibleFields,
}: ITable) => {
  const data = useRef(tableData);
  const [sorting, setSorting] = useState<SortingState>([]);

  useMemo(() => {
    data.current = tableData;
  }, [tableData]);

  const visibleFieldsMapping = useMemo(() => {
    return isVisibleFieldsMapped
      ? { columns: mappedVisibleFields }
      : visibleFields?.reduce(
          (acc: any, item) => {
            if (item.name === "s/n") {
              acc = {
                columns: [
                  ...acc.columns,
                  {
                    accessorKey: item.name,
                    enableSorting: item.sortable ?? true,
                    cell: (prop: any) => prop.row.index + 1,
                    header: () =>
                      item.Header ?? (
                        <span className="capitalize">{item.as}</span>
                      ),
                    ...item?.style,
                  },
                ],
                columnVisibility: {
                  ...acc.columnVisibility,
                  [item.name]: item.show,
                },
              };
            } else {
              acc = {
                columns: [
                  ...acc.columns,
                  {
                    accessorKey: item.name,
                    enableSorting: item.sortable ?? true,
                    cell:
                      item?.customCell ??
                      ((info: any) => (
                        <span className="break-all">
                          {info.getValue() || "N/A"}
                        </span>
                      )),
                    header: () =>
                      item.Header ?? (
                        <span className="capitalize">{item.as}</span>
                      ),
                    ...item?.style,
                  },
                ],
                columnVisibility: {
                  ...acc.columnVisibility,
                  [item.name]: item.show,
                },
              };
            }

            return acc;
          },
          {
            columns: [],
            columnVisibility: {},
          }
        );
  }, [isVisibleFieldsMapped, mappedVisibleFields, visibleFields]);

  const table = useReactTable({
    data: data.current,
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
    data: data.current,
  };
};

export default useTable;
