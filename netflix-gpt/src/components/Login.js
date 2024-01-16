import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidFormData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  BACKGROUND_IMAGE,
  MY_GUID,
  OTHER_PHOTO_URL,
  PHOTO_URL,
} from "../utils/constants";
const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otp, setOtp] = useState(null);
  const [phoneConfirmation, setPhoneConfirmation] = useState(null);
  const [signInPhone, setSignInPhone] = useState(false);
  const dispatch = useDispatch();
  const email = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  // Define a function named toggleSignInForm.
  // This function does not take any parameters.
  const toggleSignInForm = () => {
    // Use the setShowSignInForm function to toggle the value of showSignInForm.
    setShowSignInForm(!showSignInForm);
  };

  const getOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        theme: "dark",
      });
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone.current.value}`,
        recaptcha
      );
      console.log(confirmation);
      setPhoneConfirmation(confirmation);
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  const verifyOTP = async () => {
    try {
      const data = await phoneConfirmation.confirm(otp);
      console.log(data);
      updateProfile(data);
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  };

  const solveRecaptchaAgain = () => {
    return <div>Captcha expired</div>;
  };

  const onSignInSubmit = () => {};

  const handleButtonClick = () => {
    if (signInPhone && phoneConfirmation) {
      verifyOTP();
    } else {
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
            updateProfile(user);
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
    }
  };

  const updateProfile = (user) => {
    if (
      user &&
      (signInPhone
        ? user.email === email.current.value
        : user.phoneNumber === `+91${phone.current.value}`)
    ) {
      console.log(user);
      updateProfile(user, {
        displayName: name.current.value,
        photoURL: OTHER_PHOTO_URL,
      })
        .then(() => {
          const { uid, email, displayName, photoURL, phoneNumber } =
            auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
              phoneNumber: phoneNumber,
            })
          );
        })
        .catch((error) => {
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
        {!signInPhone && (
          <input
            ref={email}
            type="text"
            placeholder="Email Id"
            className="p-4 my-4 w-full bg-gray-900 rounded"
          />
        )}
        {signInPhone && (
          <input
            ref={phone}
            type="text"
            placeholder="Phone number"
            className="p-4 my-4 w-full bg-gray-900 rounded"
          />
        )}
        {!signInPhone && (
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-900 rounded"
          />
        )}
        {signInPhone && phoneConfirmation && (
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Verify OTP"
            className="p-4 my-4 w-full bg-gray-900 rounded"
          />
        )}
        {!signInPhone && (
          <div
            onClick={() => setSignInPhone(!signInPhone)}
            className="cursor-pointer hover:text-white relative left-32 text-gray-400"
          >
            Sign In with Phone Number
          </div>
        )}
        {signInPhone && (
          <div className="flex justify-between">
            <div
              onClick={() => setSignInPhone(!signInPhone)}
              className="cursor-pointer hover:text-white relative text-gray-400"
            >
              Sign In with Email
            </div>
            {!phoneConfirmation && (
              <div
                onClick={getOTP}
                className="cursor-pointer hover:text-white relative text-gray-400"
              >
                Get OTP
              </div>
            )}
          </div>
        )}
        {!phoneConfirmation && <div id="recaptcha" className="mt-2.5"></div>}
        <p className="text-red-600 font-semibold p-2 text-lg">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-600 w-full rounded"
          onClick={handleButtonClick}
        >
          {showSignInForm && signInPhone && phoneConfirmation
            ? "Verify OTP"
            : showSignInForm && !signInPhone
            ? "Sign In"
            : "Sign Up"}
        </button>
        {showSignInForm ? (
          <div className="py-10">
            <span className="text-gray-500">New to MyFlix? </span>{" "}
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
