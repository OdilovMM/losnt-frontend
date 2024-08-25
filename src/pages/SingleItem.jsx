import { useLoaderData } from "react-router-dom";
import { customFetch, imageUrl } from "../utils";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

export const loader = async ({ params }) => {
  const response = await customFetch(`/items/all-items/${params.itemId}`);
  const item = response.data.item;
  return { item };
};

const SingleItem = () => {
  
  const user = useSelector((state) => state.userState.user);
  const { item } = useLoaderData();
  const {
    name,
    photo,
    foundDate,
    city,
    contactNumber,
    orientation,
    region,
    status,
    street,
  } = item;

  const correctedPhotoPath = photo.includes("/uploads//uploads/")
  ? photo.replace("/uploads//uploads/", "/uploads/")
  : photo;

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/items">Items</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        <img
          src={`https://lost-and-found-api-r3ku.onrender.com${correctedPhotoPath}`}
          alt={name}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        <div>
          <div className="flex justify-normal gap-4 items-center">
            <h1>Topildi:</h1>
            <h1>{name}</h1>
          </div>
          <div className="flex justify-normal gap-4 items-center">
            <h1>Sana:</h1>
            <h4>{moment(foundDate).format("YYYY-MM-DD")}</h4>
          </div>
          <div className="flex justify-normal gap-4 items-center">
            <h1>Viloyat:</h1>
            <h1>{region}</h1>
          </div>
          <div className="flex justify-normal gap-4 items-center">
            <h1>Shahar:</h1>
            <h1>{city}</h1>
          </div>
          <div className="flex justify-normal gap-4 items-center">
            <h1>Mahalla:</h1>
            <h1>{street}</h1>
          </div>

          <div className="flex justify-normal gap-4 items-center">
            <h1>Moljal:</h1>
            <h1>{orientation}</h1>
          </div>
          <div className="flex justify-normal gap-4 items-center">
            <h1>Telefon:</h1>
            <h1>{contactNumber}</h1>
          </div>

          <div className="mt-6 w-[150px] rounded-md">
            {status === "open" ? (
              <>
                {user ? (
                  <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                    Davo qilish
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                  >
                    Davo qilish uchun hisobga kiring
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="p-2 rounded-md bg-red-300 block">
                  Egasi topildi
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleItem;
