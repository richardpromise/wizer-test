import { useMemo } from "react";
import useTable from "../../../hooks/useTable";
import CustomTable from "..";
import { CgMoreVerticalO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function CommentsTable({ filteredData, setOpenTreat }: any) {
  const mappedVisibleFields = useMemo(() => {
    const navigate = useNavigate();
    return [
      {
        accessorKey: "name",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs md:text-sm leading-[24px] py-[4px] px-[8px]">
            Name
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] font-medium text-xs md:text-sm tracking-[-0.2px] leading-5 md:leading-6 capitalize break-words">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs md:text-sm leading-[24px] py-[4px] px-[8px]">
            Email
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] font-medium text-xs md:text-sm tracking-[-0.2px] leading-5 md:leading-6 break-words">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "body",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs md:text-sm leading-[24px]">
            Body
          </span>
        ),
        cell: (info: any) => {
          const fullText = info.getValue();
          const truncatedText =
            fullText.length > 50 ? `${fullText.slice(0, 50)}...` : fullText;

          return (
            <span
              className="text-xs md:text-sm font-medium text-[#121212] tracking-[-0.2px] leading-5 md:leading-6 break-words"
              title={fullText}
            >
              {truncatedText}
            </span>
          );
        },
      },
      {
        accessorKey: "action",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs md:text-sm leading-[24px]"></span>
        ),
        cell: (info: any) => {
          const rowId = info.row.original.id;
          return (
            <span
              onClick={() => navigate(`/comment/${rowId}`)}
              className="text-[#121212] font-medium text-xs md:text-sm tracking-[-0.2px] leading-5 md:leading-6 flex items-center px-2 cursor-pointer"
            >
              <CgMoreVerticalO size={25} color="#8158F3" />
            </span>
          );
        },
      },
    ];
  }, [setOpenTreat]);

  const { table, data } = useTable({
    tableData: filteredData,
    mappedVisibleFields,
    isVisibleFieldsMapped: true,
  });

  return (
    <div className="w-full overflow-x-auto">
      <CustomTable
        rowBackgroundColor="bg-white"
        data={data}
        table={table}
        name="Comments table"
      />
    </div>
  );
}
