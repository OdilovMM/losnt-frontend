import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { store } from "../store";
import { ItemsGrid } from "../components";

export const combinedListLoader = async ({ request, params }) => {
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

const List = () => {

  return (
    <div className="pt-24 ">
      <ItemsGrid />
    </div>
  );
};

export default List;
