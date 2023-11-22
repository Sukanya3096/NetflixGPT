import { auth } from "../utils/firebase";
import React from "react";
// Import necessary dependencies
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

// Define the Header component
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // Use useEffect hook to handle authentication state changes
  useEffect(() => {
    // Subscribe to authentication state changes
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;

        // Dispatch an action to add the user to the Redux store
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        // Navigate to the browse page
        navigate("/browse");
      } else {
        // Dispatch an action to remove the user from the Redux store
        dispatch(removeUser());

        // Navigate to the home page
        navigate("/");
      }
    });

    // Clean up the subscription on component unmount
    return () => subscription();
  }, []);

  // Define a function named handleSignOut
  const handleSignOut = () => {
    // Call the signOut function with the auth parameter
    signOut(auth)
      .then(() => {
        // Navigate to the home page
        navigate("/");
      })
      .catch((error) => {
        // Navigate to the error page
        navigate("/error");
      });
  };

  // Render the header component
  return (
    <div className="absolute w-screen top-0 left-0 px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
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
