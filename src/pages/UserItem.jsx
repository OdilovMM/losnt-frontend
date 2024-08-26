import { useLoaderData } from "react-router-dom";
import { customFetch, imageUrl } from "../utils";
import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";

export const myLoader = async ({ params }) => {
  const response = await customFetch(`/items/all-items/${params.itemId}`);
  const item = response.data.item;
  return { item };
};

const UserItem = () => {
  const { item } = useLoaderData();
  const {
    _id,
    name,
    photo,
    foundDate,
    city,
    contactNumber,
    orientation,
    region,
    status: initialStatus,
    street,
  } = item;

  const correctedPhotoPath = photo.includes("/uploads//uploads/")
    ? photo.replace("/uploads//uploads/", "/uploads/")
    : photo;

  const [status, setStatus] = useState(initialStatus);

  const handleChangeStatus = async () => {
    try {
      const newStatus = status === "open" ? "claimed" : "open";
      const response = await customFetch.patch(`/user/all-my-items/${_id}`, {
        status: newStatus,
      });
      setStatus(newStatus);
      toast.success(response.data.msg);
    } catch (error) {
      console.error("An error occurred while updating status", error);
    }
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/list/my-list">Mening topilmalarim</Link>
          </li>
          <li>
            <Link to="/my-list">Asosiy ma'lumotlar</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        <img
          crossOrigin="anonymous"
          src={`${imageUrl}${correctedPhotoPath}`}
          alt={name}
          className="w-[250px] h-[250px] object-cover rounded-lg lg:w-full  "
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

          <div className="mt-6">
            <div className="my-4 w-[150px] rounded-md">
              {status === "open" ? (
                <p className=" p-2 rounded-md bg-slate-300 block">
                  Egasi topilmagan
                </p>
              ) : (
                <p className="p-2 rounded-md bg-red-300 block">Egasi topildi</p>
              )}
            </div>
            <button
              onClick={handleChangeStatus}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            >
              E'lon statusini o'zgartirish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserItem;
