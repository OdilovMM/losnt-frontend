import { customFetch } from "../utils";
const url = "/items/all-items";
import { ItemsGrid } from "../components";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const response = await customFetch(url, { params });
  const { items, meta } = response.data;
  return { items, meta, params };
};
const Landing = () => {
  return (
    <div className="py-2 ">
      <Filters />
      <ItemsGrid />
      <Pagination />
    </div>
  );
};

export default Landing;