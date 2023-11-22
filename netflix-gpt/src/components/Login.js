import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidFormData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, PHOTO_URL } from "../utils/constants";
const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  // Define a function named toggleSignInForm.
  // This function does not take any parameters.
  const toggleSignInForm = () => {
    // Use the setShowSignInForm function to toggle the value of showSignInForm.
    setShowSignInForm(!showSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidFormData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!showSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          if (user && user.email === email.current.value) {
            updateProfile(user, {
              displayName: name.current.value,
              photoURL: { PHOTO_URL },
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
              })
              .catch((error) => {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
              });
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMAGE} alt="background" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-12 w-3/12 mb-20 mx-auto right-0 left-0 my-36 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="py-4 text-3xl">
          {showSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!showSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-900 rounded"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="p-4 my-4 w-full bg-gray-900 rounded"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-900 rounded"
        />
        <p className="text-red-600 font-semibold p-2 text-lg">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-600 w-full rounded"
          onClick={handleButtonClick}
        >
          {showSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {showSignInForm ? (
          <div className="py-10">
            <span className="text-gray-500">New to Netflix? </span>{" "}
            <span
              onClick={toggleSignInForm}
              className="cursor-pointer hover:underline"
            >
              Sign up now
            </span>
          </div>
        ) : (
          <div className="py-10">
            <span className="text-gray-500">Already have an account? </span>{" "}
            <span
              onClick={toggleSignInForm}
              className="cursor-pointer hover:underline"
            >
              Sign in
            </span>{" "}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
