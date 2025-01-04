import { useMemo } from "react";
import useTable from "../../../hooks/useTable";
import CustomTable from "..";
import { CgMoreVerticalO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export default function UserTable({ filteredData, setOpenTreat }: any) {
  const mappedVisibleFields = useMemo(() => {
    const navigate = useNavigate();
    return [
      {
        accessorKey: "name",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start py-[4px] px-[8px]">
            Name
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] pl-3 font-medium tracking-[-0.2px] leading-6 flex justify-start py-[4px] px-[8px] text-[12px] sm:text-[14px] text-justify capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "username",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start py-[4px] px-[8px]">
            Username
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] font-medium tracking-[-0.2px] leading-6 text-[12px] sm:text-[14px] capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start py-[4px] px-[8px]">
            Email
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] font-medium tracking-[-0.2px] leading-6 text-[12px] sm:text-[14px] capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "address",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start">
            Address
          </span>
        ),
        cell: (info: any) => {
          const content = info.row.original.address.street;
          return (
            <span
              className="text-[#121212] font-medium tracking-[-0.2px] leading-6 text-[12px] sm:text-[14px] capitalize"
              title={content}
            >
              {content}
            </span>
          );
        },
      },
      {
        accessorKey: "phone",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start">
            Phone
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] font-medium tracking-[-0.2px] leading-6 text-[12px] sm:text-[14px] capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "website",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start">
            Website
          </span>
        ),
        cell: (info: any) => (
          <span className="text-[#121212] font-medium tracking-[-0.2px] leading-6 text-[12px] sm:text-[14px] capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "company",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start">
            Company
          </span>
        ),
        cell: (info: any) => {
          const content = info.row.original.company.name;
          return (
            <span
              className="text-[#121212] font-medium tracking-[-0.2px] leading-6 text-[12px] sm:text-[14px] capitalize"
              title={content}
            >
              {content}
            </span>
          );
        },
      },
      {
        accessorKey: "action",
        header: () => (
          <span className="text-[#7F7F7F] font-medium text-xs sm:text-sm leading-[24px] flex justify-start"></span>
        ),
        cell: (info: any) => {
          const rowId = info.row.original.id;
          return (
            <span
              onClick={() => navigate(`/users/${rowId}`)}
              className="text-[#121212] font-medium tracking-[-0.2px] leading-6 capitalize flex justify-start items-center px-2 cursor-pointer"
            >
              <CgMoreVerticalO color="#8158F3" />
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
    <CustomTable
      rowBackgroundColor="bg-white"
      data={data}
      table={table}
      name="User"
    />
  );
}
