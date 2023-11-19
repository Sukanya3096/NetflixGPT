import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidFormData } from "../utils/validate";
const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

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
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
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
