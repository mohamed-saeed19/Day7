import React, { useState } from "react";
import joi from "joi";
const Login = () => {
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    User_Name: "",
    password: "",
  });

  function getUserData(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setUser(myuser);
  }
  function validateRegisterForm() {
    let schema = joi.object({
      Name: joi.string().min(3).max(10).required(),
      User_Name: joi
        .string()
        .required()
        .pattern(new RegExp("/^ [a-zA-Z0-9.\\-_$@*!] {3,30}$/")),
      email: joi.string().email({ tlds: { allow: ["com", "net"] } }),
      password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  function submitRegister(e) {
    e.preventDefault();
    let validation = validateRegisterForm();
    console.log(validation);
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      console.log(user);
      setError("Successful operation");
    }
  }
  return (
    <div className="text-white">
      <form
        onSubmit={submitRegister}
        className="from-Register  w-75 ms-auto my-5"
      >
        {error ? (
          <p className="w-75 p2 alert alert-danger text-danger">{error} </p>
        ) : (
          <>
            {errorList.map((error, i) => {
              if (error.context.label === "password") {
                return (
                  <p
                    key={i}
                    className="w-75 p-2 alert alert-danger text-danger"
                  >
                    The password is weak and must not be less than five numbers{" "}
                  </p>
                );
              } else {
                return (
                  <p key={i} className="w-75 p2 alert alert-danger text-danger">
                    {error.message}{" "}
                  </p>
                );
              }
            })}{" "}
          </>
        )}

        <label htmlFor="first_name" className="text-Rgister my-2">
          Name :
        </label>
        <input
          type="text"
          id="first_name"
          className="my-input form-control w-75"
          name="Name"
          onChange={getUserData}
        />

        <label htmlFor="age" className="text-Rgister my-2">
          User Name :
        </label>
        <input
          type="text"
          id="age"
          className="my-input form-control w-75"
          name="User_Name"
          onChange={getUserData}
        />

        <label htmlFor="Email" className="text-Rgister my-2">
          Email :
        </label>
        <input
          type="email"
          id="Email"
          className="my-input form-control w-75"
          name="Email"
          onChange={getUserData}
        />

        <label htmlFor="p assword" className="text-Rgister my-2">
          Password :
        </label>
        <input
          type="password"
          id="password"
          className="my-input form-control w-75"
          name="password"
          onChange={getUserData}
        />

        <button type="submit" className="btn btn-outline-danger my-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
