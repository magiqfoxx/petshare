import React, { useState } from "react";
import firebase from "../firebase2";

const SignUp = props => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async event => {
    event.preventDefault();
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    if (response) {
      setUser(response.user);
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={handleSignUp} className="form">
        <h2 className="form__title">Sign up</h2>
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
        <p onClick={() => props.signIn()}>Sign in instead</p>
      </form>
    </div>
  );
};

export default SignUp;
