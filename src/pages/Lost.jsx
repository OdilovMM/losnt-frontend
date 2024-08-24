import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Ilimos, akkauntingizga kiring");
    return redirect("/");
  }
  return null;
};

const Lost = () => {
  return <div>Lost</div>;
};

export default Lost;
