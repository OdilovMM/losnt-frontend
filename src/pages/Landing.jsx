import { customFetch } from "../utils";
const url = "/items/all-items";
import { ItemsGrid, Pagination } from "../components";
import Filters from "../components/Filters.jsx";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch(url, { params });
  const { items, meta } = response.data;
  return { items, meta, params };
};
const Landing = () => {
  const { items } = useLoaderData();
  return (
    <div className="py-2 ">
      <Filters />
      {items.length > 0 ? (
        <p className="mt-6">Umumiy {items.length} buyum topildi</p>
      ) : (
        ""
      )}
      <ItemsGrid />
      <Pagination />
    </div>
  );
};

export default Landing;
