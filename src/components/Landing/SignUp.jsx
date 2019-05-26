import React, { useState, useContext } from "react";
import firebase, { firestore } from "../firebase";

import PasswordsNotMatching from "./PasswordsNotMatching";

const SignUp = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSignUp = async event => {
    event.preventDefault();
    if (password === password2) {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage, errorCode);
        });
      if (response) {
        //save user in the database
        const newUser = {
          //only for email sign up!
          name: name,
          email: response.user.email,
          uid: response.user.uid
        };
        firestore
          .collection("users")
          .doc(newUser.uid)
          .set(newUser, { merge: true });
      }
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleSignUp} className="form">
        <h2 className="form__title">Sign up</h2>
        <label htmlFor="name">Name (displayed):</label>
        <input
          value={name}
          id="name"
          onChange={e => setName(e.target.value)}
          type="name"
          placeholder="Pet enthusiast"
        />
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
        <label htmlFor="password2">Confirm Password</label>
        <input
          value={password2}
          id="password2"
          onChange={e => setPassword2(e.target.value)}
          type="password"
          minLength="6"
          placeholder="********"
        />
        {password !== password2 ? <PasswordsNotMatching /> : null}

        <input className="input__button" type="submit" value="submit" />
        <p className="form__text" onClick={() => props.signIn()}>
          Sign in instead
        </p>
      </form>
    </div>
  );
};

export default SignUp;
