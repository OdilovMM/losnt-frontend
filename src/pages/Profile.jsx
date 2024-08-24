import React from "react";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Ilimos, akkauntingizga kiring");
    return redirect("/");
  }
  return null;
};

const Profile = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <div className="w-full min-h-[36vh]">
      <div className="flex justify-normal gap-5 py-2">
        <h1>Mening Ismim:</h1>
        <span>{user.name}</span>
      </div>
      <div className="flex justify-normal gap-5 py-2">
        <h1>Email:</h1>
        <span>{user.email}</span>
      </div>
      <div className="flex justify-normal gap-5 py-2">
        <h1>Telefon Raqam:</h1>
        <span>{user.mobile}</span>
      </div>
      <div className="flex justify-normal gap-5 py-2">
        <Link to='/found' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          Topib Oldim
        </Link>
        <Link to='/list' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
          Ro'yxat
        </Link>
      </div>
    </div>
  );
};

export default Profile;
