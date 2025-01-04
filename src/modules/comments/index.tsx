import CommentsTable from "../../components/table/comment";
import Loader from "../../components/loader";
import Pagination from "../../components/padgination";

import { useComments } from "../../server";

export default function Comments() {
  const {
    data,
    isFetching,
    isLoading,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
  } = useComments();

  if (isLoading || isFetching) return <Loader />;

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between  border-[12px] border-[#F5F5F5] bg-[#ffff] ">
        <div className="h-[89%] overflow-y-scroll">
          <CommentsTable filteredData={data || []} />
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
