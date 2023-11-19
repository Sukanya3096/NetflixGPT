export const checkValidFormData = (email, password) => {
  const isEmailValid =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      email
    );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g.test(
      password
    );

  if (!isEmailValid) {
    return "Invalid email!";
  } else if (!isPasswordValid) {
    return "Invalid password!";
  } else {
    return null;
  }
};
