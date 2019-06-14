import React, { useState, useContext } from "react";
import { UserContext } from "../../App";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import WhySignUp from "./WhySignUp";
import Dashboard from "../Dashboard/Dashboard";

const Landing = props => {
  const user = useContext(UserContext);
  //const [user, setUser] = useState(null);
  const [signIn, setSignIn] = useState(false);
  return (
    <main className="main">
      {user ? (
        <Dashboard />
      ) : (
        <div className="landing">
          <div className="landing__form">
            <SignUp signIn={() => setSignIn(true)} />
          </div>

          {signIn ? (
            <SignIn />
          ) : (
            <WhySignUp logInAsAnonymous={props.logInAsAnonymous} />
          )}
        </div>
      )}
    </main>
  );
};

export default Landing;
