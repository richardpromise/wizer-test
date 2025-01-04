import Loader from "../../components/loader";
import Pagination from "../../components/padgination";
import UserTable from "../../components/table/user";
import { useUsers } from "../../server/users";

export default function Users() {
  const {
    data,
    isFetching,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
  } = useUsers();

  if (isFetching) return <Loader />;
  console.log(data);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between border-[12px] border-[#F5F5F5] bg-[#ffff] ">
        <div className="h-[89%] overflow-y-scroll">
          <UserTable filteredData={data || []} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onRowsPerPageChange={(rows) => {
            setItemsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      </div>
    </>
  );
}
