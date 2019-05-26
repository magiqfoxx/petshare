import React, { useState } from "react";

import firebase, { firestore } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async event => {
    event.preventDefault();
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage, errorCode);
      });
    if (response) {
    }
  };
  return (
    <div className="sign-in">
      <form onSubmit={handleSignIn} className="form">
        <h2 className="form__title">Sign in</h2>

        <label htmlFor="email">Email:</label>
        <input
          value={email}
          id="email"
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="example@mail.com"
        />

        <label htmlFor="password">Password</label>
        <input
          value={password}
          id="password"
          onChange={e => setPassword(e.target.value)}
          type="password"
          minLength="6"
          placeholder="********"
        />
        <input className="input__button" type="submit" value="submit" />
      </form>
    </div>
  );
};

export default SignIn;
