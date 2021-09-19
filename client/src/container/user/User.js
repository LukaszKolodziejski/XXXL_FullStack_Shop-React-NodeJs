import React, { useState, useEffect } from "react";
// import { Redirect, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actoinCreator from "../../store/actions/user";

const User = (props) => {
  const redirect = useSelector((state) => state.products.redirect);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const inputHandler = (e, setValue) => setValue(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(actoinCreator.createUserAccount(username, email));
    setUsername("");
    setEmail("");
  };

  return (
    <main>
      <form className="user-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => inputHandler(e, setUsername)}
            name="username"
            id="username"
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => inputHandler(e, setEmail)}
            name="email"
            id="email"
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
};

export default User;
