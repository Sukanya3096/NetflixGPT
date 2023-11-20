import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute w-screen top-0 left-0 px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {console.log(user)}
      {user && (
        <div className="flex p-2">
          <span className="bg-black text-white m-4 p-3 transition width: .40s hover:w-full group flex w-20">
            <img
              className="w-12 rounded-full"
              src={user.photoURL}
              alt="user icon"
            />
            <button
              className="opacity-0 group-hover:opacity-90 mx-2 font-bold font-mono"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
