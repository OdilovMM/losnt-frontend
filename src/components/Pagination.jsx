import {
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Pagination = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { name, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(name);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-10 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Oldingi
        </button>
        {pages.map((pageNum) => {
          return (
            <button
              onClick={() => handlePageChange(pageNum)}
              key={pageNum}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNum === page ? "bg-base-300 border-base-200" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage < pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Keyingi
        </button>
      </div>
    </div>
  );
};

export default Pagination;
