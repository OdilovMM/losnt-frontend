import { Link, redirect, useLoaderData } from "react-router-dom";
import moment from "moment";
import { MdAccessTime } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaBuildingColumns } from "react-icons/fa6";
import { customFetch, imageUrl } from "../utils";
import { toast } from "react-toastify";
import { store } from "../store";

export const myListLoader = async ({ request, params }) => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Iltimos, akkauntingizga kiring");
    return redirect("/");
  }

  try {
    const response = await customFetch.get("/user/all-my-items");
    const { items } = response.data.my_posts;

    return { items };
  } catch (error) {
    console.error("Error fetching user items:", error);
    toast.error("Elementlarni yuklashda xatolik yuz berdi.");
    return redirect("/"); 
  }
};

const MyList = () => {
  const { items } = useLoaderData();
  

  if (items.length === 0)
    return (
      <div className="pt-12">
        <p className="text-3xl w-full">Hech narsa topilmadi</p>
      </div>
    );



  return (
    <div className="pt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      {items.map((item, _id) => {
        const { name, city, foundDate, orientation, photo } = item;

        const correctedPhotoPath = photo.includes("/uploads//uploads/")
          ? photo.replace("/uploads//uploads/", "/uploads/")
          : photo;
        return (
          <Link
            key={_id}
            to={`/list/my-list/${item._id}`}
            className="card w-full  shadow-xl hover:shadow-2xl pt-[0.5px]  transition duration-300 "
          >
            <figure>
              <img
               src={`https://lost-and-found-api-r3ku.onrender.com${correctedPhotoPath}`}
                alt={name}
                className=" h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-start text-center">
              <div className="flex justify-between w-full items-center">
                <h2>Topib Olindi</h2>
                <p className="italic">{name}</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <span>
                  <IoLocationSharp size={18} />
                </span>
                <h2 className="italic">{city}</h2>
              </div>
              <div className="flex justify-between w-full items-center">
                <span>
                  <MdAccessTime size={18} />
                </span>
                <h2 className="italic">
                  {moment(foundDate).format("YYYY-MM-DD")}
                </h2>
              </div>
              <div className="flex justify-between w-full items-center">
                <span>
                  <FaBuildingColumns size={18} />
                </span>
                <h2 className="italic">{orientation}</h2>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default MyList;
